import axios from "axios";

export const fetchCoinService = async () => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr"
  );

  return data;
};
