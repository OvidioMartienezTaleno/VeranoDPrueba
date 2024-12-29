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
          welcome: "Welcome to Game Saver Central",
          description: "Find the best deals!",
          home: "Home",
          search: "Search",
          stores: "Stores",
          fullList: "Full List",
          normalPrice: "Normal Price",
          salePrice: "Sale Price",
          searchPlaceholder: "Search for games...",
          searchButton: "Search",
          searchGames: "Search Games",
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
        },
      },
      es: {
        translation: {
          welcome: "Bienvenido a Game Saver Central",
          description: "¡Encuentra las mejores ofertas!",
          home: "Inicio",
          search: "Buscar",
          stores: "Tiendas",
          fullList: "Lista Completa",
          normalPrice: "Precio Normal",
          salePrice: "Precio de oferta",
          searchPlaceholder: "Buscar juegos...",
          searchButton: "Buscar",
          searchGames: "Buscar Juegos",
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
        },
      },
    },
    fallbackLng: "en", // Idioma por defecto
    interpolation: {
      escapeValue: false, // React ya escapa los valores de manera segura
    },
  });

export default i18n;
