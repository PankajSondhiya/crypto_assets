import axios from "axios";

export const fetchTrendingCoinsService = async () => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
  );
  return data;
};
