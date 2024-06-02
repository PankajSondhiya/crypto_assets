import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import {
  setCurrentItemToWatchList,
  setWatchList,
} from "../../slice/coinDetail.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CoinDetailHeader = ({ navigation }) => {
  const { watchList } = useSelector((store) => store.coinDetailPage);

  const { coinData, loading, isError } = useSelector(
    (store) => store.coinDetailPage.coinDetail
  );

  const dispatch = useDispatch();

  const checkItemInWatchList = (id) => {
    return watchList.some((item) => item === id);
  };

  const updateWatchList = async (updatedWatchList) => {
    try {
      const jsonValue = JSON.stringify(updatedWatchList);
      AsyncStorage.setItem("@watchList", jsonValue);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleCurrentCoin = async (id) => {
    let newWatchList;
    if (checkItemInWatchList(id)) {
      newWatchList = watchList.filter((coinId) => coinId !== id);
    } else {
      newWatchList = [...watchList, id];
    }
    dispatch(setWatchList(newWatchList));
    await updateWatchList(newWatchList);
  };

  return (
    <View>
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
            flexDirection: "row",
          }}
        >
          <View style={styles.badge}>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              #{coinData.market_cap_rank}
            </Text>
          </View>
          <Text
            style={{
              color: "grey",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 3,
            }}
          >
            {coinData.symbol}
          </Text>
          {coinData.image && coinData.image.small && (
            <Image
              source={{ uri: coinData.image.large }}
              style={{ height: 30, width: 30, marginLeft: 3 }}
            />
          )}
        </View>
        <View>
          <Fontisto
            name="favorite"
            size={28}
            color={checkItemInWatchList(coinData.id) ? "white" : "grey"}
            onPress={() => handleCurrentCoin(coinData.id)}
          />
        </View>
      </View>
      <View style={styles.chartHeader}>
        <View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "orange",
            }}
          >
            {coinData.name}
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "grey",
            }}
          >
            ₹
            {coinData.market_data &&
              coinData.market_data.current_price &&
              coinData.market_data.current_price.inr}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ color: "grey", fontSize: 13, fontWeight: "bold" }}>
            24h change
          </Text>
          <Text
            style={{
              color:
                coinData.market_data &&
                coinData.market_data.price_change_percentage_24h > 0
                  ? "#00FF00"
                  : "red",
              fontSize: 16,
            }}
          >
            {coinData.market_data &&
              coinData.market_data.price_change_percentage_24h.toFixed(2)}
            %
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  chartHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  header: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    borderRadius: 5,
    backgroundColor: "grey",
    padding: 2,
    marginRight: 3,
  },
});

export default CoinDetailHeader;
