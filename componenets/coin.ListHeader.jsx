import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
} from "react-native";
import TrendingCoins from "./trendingCoins";
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceChangeIndex, setShowmodal } from "../slice/coin";

const CoinListHeader = () => {
  const priceChangeArray = ["MarketPrice", "24High", "24Low"];
  const { priceChangeIndex, showModal } = useSelector(
    (store) => store.homePage
  );
  const dispatch = useDispatch();

  const handlePriceChange = () => {
    const newIndex = (priceChangeIndex + 1) % priceChangeArray.length;

    dispatch(setPriceChangeIndex(newIndex));
  };

  return (
    <View style={styles.listHeader}>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
          onPress={() => dispatch(setShowmodal())}
        >
          Sort by
        </Text>
        <FontAwesome6 name="arrow-up-wide-short" size={14} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyConten: "center",
          alignItems: "center",
        }}
      >
        <Entypo name="chevron-small-left" size={16} color="white" />
        <Entypo name="chevron-small-right" size={16} color="white" />

        <Text
          style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
          onPress={() => handlePriceChange()}
        >
          {priceChangeArray[priceChangeIndex]}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  listHeader: {
    marginVertical: 10,
    height: 30,
    backgroundColor: "black",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    // borderBottomColor: "grey",
    // borderBottomWidth: 1,
    // position: "absolute",
  },
});

export default CoinListHeader;
