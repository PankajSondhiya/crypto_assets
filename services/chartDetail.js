import axios from "axios";

export const fetchChartDetails = async ({ id, timeRange }) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${timeRange}`
  );

  const prices = data.prices;
  const lineChartData = prices.map(([timeStamp, value]) => ({
    value,
    timeStamp,
  }));

  return lineChartData;
};
