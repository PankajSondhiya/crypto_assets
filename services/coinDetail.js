import axios from "axios";
import { useCallback } from "react";

const fetchCoinDetail = async (id) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}`
  );
  return data;
  // const currencies =
  //   coinDetail.market_data && coinDetail.market_data.current_price;
  // let keys = Object.keys(currencies);
  // setCurrencyList(keys);
  // setDetailLoading(false);
};

export default fetchCoinDetail;
