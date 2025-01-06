import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./ListStore.css"; // Importa el archivo CSS

interface Store {
  storeID: string;
  storeName: string;
  isActive: number;
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
  link?: string;
}

const STORE_LINKS: { [key: string]: string } = {
  "1": "https://store.steampowered.com/",
  "2": "https://www.gamersgate.com/es/",
  "3": "https://www.greenmangaming.com/es/",
  "4": "https://www.amazon.com/-/es/",
  "5": "https://www.gamestop.com/",
  "6": "https://www.direct2drive.com/",
  "7": "https://www.gog.com/",
  "8": "https://www.origin.com/",
  "9": "https://www.getgamesgo.com/",
  "10": "https://www.shinyloot.com/",
  "11": "https://www.humblebundle.com/store",
  "12": "https://www.desura.com/",
  "13": "https://store.ubi.com/",
  "14": "https://www.indiegamestand.com/",
  "15": "https://www.fanatical.com/",
  "16": "https://www.gamesrocket.com/",
  "17": "https://gamesrepublic.com/",
  "18": "https://silagames.com/",
  "19": "https://www.playfield.io/",
  "20": "https://www.imperialgames.com/",
  "21": "https://www.wingamestore.com/",
  "22": "https://www.funstockdigital.co.uk/",
  "23": "https://www.gamebillet.com/",
  "24": "https://www.voidu.com/",
  "25": "https://www.epicgames.com/store/en-US/",
  "26": "https://www.razer.com/",
  "27": "https://us.gamesplanet.com/",
  "28": "https://www.gamesload.com/",
  "29": "https://www.2game.com/",
  "30": "https://www.indiegala.com/",
  "31": "https://us.shop.battle.net/",
  "32": "https://www.allyouplay.com/",
  "33": "https://www.dlgamer.com/",
  "34": "https://www.noctre.com/",
  "35": "https://www.dreamgame.com/",
};

const ListStores: React.FC = () => {
  const { t } = useTranslation();
  const [stores, setStores] = useState<Store[]>([]);
  const BASE_URL = "https://www.cheapshark.com"; // URL base de CheapShark

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(
          "https://www.cheapshark.com/api/1.0/stores"
        );
        const storesWithFullUrls = response.data.map((store: Store) => ({
          ...store,
          images: {
            banner: `${BASE_URL}${store.images.banner}`,
            logo: `${BASE_URL}${store.images.logo}`,
            icon: `${BASE_URL}${store.images.icon}`,
          },
          link:
            STORE_LINKS[store.storeID] || `${BASE_URL}/store/${store.storeID}`,
        }));
        setStores(storesWithFullUrls);
      } catch (error) {
        console.error("Error fetching stores data: ", error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="store-list">
      {stores.map((store) => (
        <div key={store.storeID} className="store">
          <a href={store.link} target="_blank" rel="noopener noreferrer">
            <img src={store.images.logo} alt={store.storeName} />
          </a>
          <h2>{store.storeName}</h2>
          <ul className="store-links">
            {store.link && (
              <li>
                <a href={store.link} target="_blank" rel="noopener noreferrer">
                  {t("visit")} {store.storeName}
                </a>
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListStores;
