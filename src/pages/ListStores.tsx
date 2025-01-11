import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../css/ListStore.css"; // Importa el archivo CSS

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

const ListStores: React.FC = () => {
  const { t } = useTranslation();
  const [stores, setStores] = useState<Store[]>([]);
  const [storeLinks, setStoreLinks] = useState<{ [key: string]: string }>({});
  const BASE_URL = "https://www.cheapshark.com"; // URL base de CheapShark

  useEffect(() => {
    const fetchStoreLinks = async () => {
      try {
        const response = await fetch("/storeLinks.json");
        const linksData = await response.json();
        setStoreLinks(linksData);
      } catch (error) {
        console.error("Error fetching store links data: ", error);
      }
    };

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
            storeLinks[store.storeID] || `${BASE_URL}/store/${store.storeID}`,
        }));
        setStores(storesWithFullUrls);
      } catch (error) {
        console.error("Error fetching stores data: ", error);
      }
    };

    fetchStoreLinks().then(fetchStores);
  }, [storeLinks]);

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
