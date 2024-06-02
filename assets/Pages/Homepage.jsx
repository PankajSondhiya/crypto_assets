import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";

import Header from "../../componenets/header";
import SortBY from "../../componenets/sortByModal";
import CoinListHeader from "../../componenets/coin.ListHeader";
import CoinList from "../../componenets/coinList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchCoins, fetchTrendingCoins } from "../../slice/coin";
import TrendingCoinList from "../../componenets/trendingCoinList";
import SortBy from "../../componenets/sortByModal";

const Homepage = ({ navigation }) => {
  const dispatch = useDispatch();

  const { data, isError, loading } = useSelector(
    (store) => store.homePage.coinsData
  );

  const { searchText } = useSelector((store) => store.homePage);

  const { sortBy } = useSelector((store) => store.homePage);

  useEffect(() => {
    dispatch(fetchTrendingCoins());
    dispatch(fetchCoins());
  }, [dispatch]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return (
      data &&
      [...data]
        .filter(
          (coin) =>
            coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => {
          switch (sortBy) {
            case "name":
              return a.name.localeCompare(b.name);
            case "24hChange":
              return (
                a.price_change_percentage_24h - b.price_change_percentage_24h
              );

            case "currentPrice":
              return a.current_price - b.current_price;
            case "rank":
              return a.market_cap_rank - b.market_cap_rank;
            default:
              return 0;
          }
        })
    );
  }, [data, searchText, sortBy]);

  return (
    <>
      <View style={styles.container}>
        <StatusBar style={{ color: "white" }} />
        <Header />

        <View style={{ backgroundColor: "grey", color: "black" }}>
          <TrendingCoinList navigation={navigation} />
        </View>
        <CoinListHeader />

        <View style={styles.coinList}>
          {loading ? (
            <ActivityIndicator size={36} color="orange" />
          ) : (
            <FlatList
              data={filteredData}
              verticle={true}
              renderItem={({ item }) => (
                <CoinList navigation={navigation} coin={item} />
              )}
              keyExtractor={(coin) => coin.id}
              showsHorizontalScrollIndicator={false}
            />
          )}

          <SortBy />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    position: "relative",
  },
  trendingCoins: {
    paddingHorizontal: 8,
  },

  coinList: {
    marginBottom: 19,
    padding: 8,
  },
  timechange: {
    fontSize: 18,
    fontWeight: "bold",
  },
  shortList: {
    paddingRight: 10,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    backgroundColor: "black",
  },
});

export default Homepage;
