// src/services/api.ts
import { Game } from "../types/Game";

export const fetchGames = async (): Promise<Game[]> => {
  const apiUrl = `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15`;
  try {
    const response = await fetch(apiUrl);
    const data: Game[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
////
//
