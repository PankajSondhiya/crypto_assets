import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CoinList from "../../componenets/coinList";
import CoinListHeader from "../../componenets/coin.ListHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setWatchList } from "../../slice/coinDetail.slice";

const WatchList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();
  const { data, loading, isError } = useSelector(
    (store) => store.homePage.coinsData
  );
  const { watchList } = useSelector((store) => store.coinDetailPage);

  const dispatch = useDispatch();

  const loadWatchList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchList");
      const loadedWatchList = jsonValue != null ? JSON.parse(jsonValue) : [];
      dispatch(setWatchList(loadedWatchList));
    } catch (error) {
      console.error("Failed to load watchlist from AsyncStorage", error);
    }
  };

  useEffect(() => {
    loadWatchList();
  }, [dispatch]);

  useEffect(() => {
    if (data && watchList) {
      const filteredCoins = data.filter((coin) => watchList.includes(coin.id));
      setFilteredData(filteredCoins);
    }
  }, [watchList]);

  return (
    <View style={styles.watchListContainer}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-sharp"
          size={30}
          color="orange"
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            My Watchlist
          </Text>
        </View>
      </View>
      <CoinListHeader />
      {filteredData.length !== 0 ? (
        <FlatList
          data={filteredData}
          verticle={true}
          renderItem={({ item }) => <CoinList coin={item} />}
        />
      ) : (
        <Pressable
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("home")}
        >
          <Text style={{ color: "grey", fontSize: 15 }}>
            Add item to display
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  watchListContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default WatchList;
