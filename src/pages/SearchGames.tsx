import React, { useState } from "react";
import "./SearchGames.css";
import { useTranslation } from "react-i18next";
//import "../App.css";

// Interfaces para tipar los datos
interface Game {
  gameID: string;
  external: string;
  thumb: string;
  cheapest: string;
  cheapestDealID: string;
}

interface GameDetails {
  info: {
    title: string;
    thumb: string;
    steamAppID?: string;
    steamRatingPercent?: string;
    steamRatingText?: string;
  };
  cheapestPriceEver?: {
    price: string;
    date: number;
  };
  deals: GameDeal[];
}

interface GameDeal {
  storeID: string;
  dealID: string;
  price: string;
  retailPrice?: string;
  savings?: string;
  storeName?: string;
}

const SearchGames: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [details, setDetails] = useState<GameDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setSelectedGame(null);
    setDetails(null);
    setError(null);

    try {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(
          searchQuery
        )}`
      );
      if (!response.ok) {
        throw new Error(t("apiFetchError"));
      }
      const data = await response.json();
      setGames(data);
      if (data.length === 0) {
        setError(t("noGame"));
      }
    } catch (error) {
      console.error("Error fetching games:", error);
      setError(t("searchFetchError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (game: Game) => {
    setIsLoading(true);
    setSelectedGame(game);
    setDetails(null);
    setError(null);

    try {
      const gameResponse = await fetch(
        `https://www.cheapshark.com/api/1.0/games?id=${game.gameID}`
      );
      if (!gameResponse.ok) {
        throw new Error(t("apiFetchError"));
      }

      const cheapSharkData: GameDetails = await gameResponse.json();

      if (game.cheapestDealID) {
        const dealResponse = await fetch(
          `https://www.cheapshark.com/api/1.0/deals?id=${game.cheapestDealID}`
        );
        if (dealResponse.ok) {
          const dealData = await dealResponse.json();
          if (dealData.gameInfo) {
            cheapSharkData.info.steamRatingPercent =
              dealData.gameInfo.steamRatingPercent;
            cheapSharkData.info.steamRatingText =
              dealData.gameInfo.steamRatingText;
          }
        }
      }

      const storeNamesMap: { [key: string]: string } = {
        "1": "Steam",
        "2": "GamersGate",
        "3": "GreenManGaming",
        "4": "Amazon",
        "5": "GameStop",
        "6": "Direct2Drive",
        "7": "GOG",
        "8": "Origin",
        "9": "Get Games",
        "10": "Shiny Loot",
        "11": "Humble Store",
        "15": "Fanatical",
        "25": "Epic Games Store",
        "27": "Gamesplanet",
        "30": "IndieGala",
        "31": "Blizzard Shop",
      };

      cheapSharkData.deals = cheapSharkData.deals.map((deal) => ({
        ...deal,
        storeName: storeNamesMap[deal.storeID] || t("unknownStore"),
        savings: deal.savings
          ? `${Math.round(parseFloat(deal.savings))}%`
          : "0%",
      }));

      console.log(t("detailGame"), cheapSharkData);
      setDetails(cheapSharkData);
    } catch (error) {
      console.error("Error fetching game details:", error);
      setError(t("detailError"));
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: string | number): string => {
    return `$${parseFloat(price.toString()).toFixed(2)}`;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h2 className="search_games_h2">{t("searchDetailsGames")}</h2>
      {selectedGame && details ? (
        <div className="game_details">
          <button onClick={() => setSelectedGame(null)} className="back_button">
            {t("back")}
          </button>
          <div className="details_content">
            <img
              src={details.info.thumb || selectedGame.thumb}
              alt={details.info.title || selectedGame.external}
              className="game_image"
            />
            <h2>{details.info.title || selectedGame.external}</h2>
            <div className="game_info">
              <div className="game_ratings">
                {details.info.steamRatingText && (
                  <p className="rating">
                    <strong>{t("rating")}</strong>{" "}
                    {details.info.steamRatingText}
                  </p>
                )}
                {details.info.steamRatingPercent && (
                  <p className="reviews">
                    <strong>{t("reviews")}</strong>{" "}
                    {details.info.steamRatingPercent}% positivas
                  </p>
                )}
                {!details.info.steamRatingText &&
                  !details.info.steamRatingPercent && (
                    <>
                      <p className="rating">
                        <strong>{t("rating")}</strong> {t("noRating")}
                      </p>
                      <p className="reviews">
                        <strong>{t("reviews")}</strong> {t("noReviews")}
                      </p>
                    </>
                  )}
              </div>
              <div className="price_record">
                <h3>{t("record")}</h3>
                {details.cheapestPriceEver && (
                  <p>
                    {t("lowestPrice")}
                    {formatPrice(details.cheapestPriceEver.price)}
                  </p>
                )}
                {details.deals?.[0]?.price && (
                  <p>
                    {t("bestPrice")} {formatPrice(details.deals[0].price)}
                  </p>
                )}
              </div>
              <div className="stores">
                <h3>{t("available")}</h3>
                {details.deals.length > 0 ? (
                  <div className="stores_grid">
                    {details.deals.map((deal: GameDeal) => (
                      <div key={deal.dealID} className="store_item">
                        <p className="store_name">
                          <strong>{deal.storeName}</strong>
                        </p>
                        <p className="store_price">
                          {formatPrice(deal.price)}
                          {deal.savings && deal.savings !== "0%" && (
                            <span className="savings_tag">
                              {" "}
                              (-{deal.savings})
                            </span>
                          )}
                        </p>
                        <a
                          href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="store_link"
                        >
                          {t("seeStore")}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>{t("noOffers")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="search_games_container">
            <div className="search_bar">
              <input
                type="text"
                placeholder={t("searchBarGames")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? t("searchS") : t("searchButton")}
              </button>
            </div>
          </div>

          {error && <p className="error_message">{error}</p>}

          {isLoading ? (
            <p className="loading_search"> {t("loading")}</p>
          ) : (
            <div className="games_list">
              {games.map((game) => (
                <div className="game_card" key={game.gameID}>
                  <img src={game.thumb} alt={game.external} />
                  <h3>{game.external}</h3>
                  <p className="price">
                    {t("from")} {formatPrice(game.cheapest)}
                  </p>
                  <button onClick={() => handleViewDetails(game)}>
                    {t("seeDetails")}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchGames;
