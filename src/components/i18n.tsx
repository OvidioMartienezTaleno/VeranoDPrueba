// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Detecta el idioma del usuario
  .use(initReactI18next) // Conecta con React
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Game Saver Central",
          description: "Find the best deals!",
          home: "Home",
          search: "Search Offer",
          stores: "Stores",
          fullList: "Full List",
          normalPrice: "Normal Price",
          salePrice: "Sale Price",
          searchPlaceholder: "Search for games...",
          searchButton: "Search",
          searchGames: "Search Offer",
          searchField: "Search Field",
          loading: "Loading...",
          searchEmptyError: "Search term cannot be empty.",
          apiFetchError: "Error fetching data from API.",
          searchFetchError:
            "There was a problem searching for games. Please try again.",
          savings: "Savings",
          store: "Store",
          viewDeal: "View Deal",
          rating: "Rating",

          searchDetailsGames: "Search Games",
          unknowStore: "Unknown Store",
          searchBarGames: "Search for videogames (Ex: Cyberpunk, Mario)...",
          searchS: "Searching...",
          reviews: "Reviews:",
          record: "Price Record:",
          lowestPrice: "Lowest Price:",
          bestPrice: "Best current price:",
          available: "Available in:",
          noGame: "No games found with that title",
          detailGame: "Videogame details:",
          detailError: "Error loading game details.",
          back: "Back",
          seeStore: "See Store",
          noOffers: "There are no offers available at this time.",
          from: "From:",
          seeDetails: "See Details",
          noRating: "Rating not available",
          noReviews: "No reviews available",

          seachStore: "Search Videogames by Stores",
          allStores: "All Stores",
          price: "Price:",
          noGames: "There are no Videogames.",
          visit: "Visit",
          signOut: "log out",
        },
      },
      es: {
        translation: {
          welcome: "Game Saver Central",
          description: "¡Encuentra las mejores ofertas!",
          home: "Inicio",
          search: "Buscar oferta",
          stores: "Tiendas",
          fullList: "Lista Completa",
          normalPrice: "Precio Normal",
          salePrice: "Precio de Oferta",
          searchPlaceholder: "Buscar juego...",
          searchButton: "Buscar",
          searchGames: "Buscar Oferta",
          searchField: "Campo de búsqueda",
          loading: "Cargando...",
          searchEmptyError: "El término de búsqueda no puede estar vacío.",
          apiFetchError: "Error al obtener los datos de la API.",
          searchFetchError:
            "Hubo un problema al buscar los juegos. Intenta nuevamente.",
          savings: "Ahorro",
          store: "Tienda",
          viewDeal: "Ver Oferta",
          rating: "Calificación",

          searchDetailsGames: "Buscar Juegos",
          unknownStore: "Tienda Desconocida",
          searchBarGames: "Buscar videojuegos (Ej: Cyberpunk, Mario)...",
          searchS: "Buscando...",
          reviews: "Reseñas:",
          record: "Récord de Precios:",
          lowestPrice: "Precio más bajo histórico:",
          bestPrice: "Mejor precio actual:",
          available: "Disponible en:",
          noGame: "No se encontraron juegos con ese título.",
          detailGame: "Detalles del videojuego:",
          detailError: "Error al cargar los detalles del juego.",
          back: "Volver",
          seeStore: "Ver tienda",
          noOffers: "No hay ofertas disponibles en este momento.",
          from: "Desde:",
          seeDetails: "Ver Detalles",
          noRating: "Rating no disponible",
          noReviews: "No hay reseñas disponibles",

          seachStore: "Buscar juegos por Tiendas",
          allStores: "Todas las tiendas",
          price: "Precio:",
          noGames: "No hay juegos.",
          visit: "Visitar",
          signOut: "Cerrar sesión",
        },
      },
    },
    fallbackLng: "en", // Idioma por defecto
    interpolation: {
      escapeValue: false, // React ya escapa los valores de manera segura
    },
  });

export default i18n;
