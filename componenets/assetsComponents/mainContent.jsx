import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import {
  setAssets,
  setBalanceLeft,
  setMarketPrice,
  setQuantity,
  setRequiredAmount,
} from "../../slice/asset.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "./button";

const MainContent = () => {
  const { quantity, requiredAmount, balanceLeft, assets, marketPrice } =
    useSelector((store) => store.assets);
  const { coinData, loading, isError } = useSelector(
    (store) => store.coinDetailPage.coinDetail
  );

  //   async function clear() {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log("storage cleared");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   useEffect(() => {
  //     clear();
  //   }, []);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const currentBuy = {
    "24hChange": coinData?.market_data?.price_change_percentage_24h,
    InvestedAmount: requiredAmount,
    Name: coinData.name,
    Quantity: quantity,
    currentPrice: coinData?.market_data?.current_price.inr,
    id: coinData.id,
    marketPrice: marketPrice,
  };

  const handleAssetsChange = async (updatedAssets) => {
    dispatch(setAssets(updatedAssets));
    await AsyncStorage.setItem("@assets", JSON.stringify(updatedAssets));
  };
  const handleBuy = async () => {
    Alert.alert("current order", "your current order has been placed", [
      {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      },
      {
        text: "holdings",
        onPress: () => navigation.navigate("profile"),
      },
    ]);
    const jsonValue = JSON.stringify(balanceLeft);
    await AsyncStorage.setItem("@balance", jsonValue);

    let storedAssets = await AsyncStorage.getItem("@assets");
    let totalAssets = storedAssets ? JSON.parse(storedAssets) : [];
    let index = totalAssets.findIndex((coin) => coin.id === coinData.id);

    if (index !== -1) {
      totalAssets = assets.map((coin) => {
        if (coin.id === assets[index].id) {
          return {
            ...coin,
            InvestedAmount: coin.InvestedAmount + requiredAmount,
            Quantity: Number(coin.Quantity) + Number(quantity),
          };
        }
        return coin;
      });
    } else {
      totalAssets = [...totalAssets, currentBuy];
    }

    handleAssetsChange(totalAssets);
    dispatch(setQuantity(""));
    dispatch(setRequiredAmount(0));
  };

  const handleSell = async () => {
    const index = assets.findIndex((coin) => coin.Name === coinData.name);

    if (quantity > assets[index].Quantity) {
      Alert.alert("Error", "Insufficient quantity to sell");
      return;
    }
    const saleAmount = quantity * coinData?.market_data?.current_price?.inr;

    const updatedBalance = saleAmount + balanceLeft;
    dispatch(setBalanceLeft(updatedBalance));

    const updateAssets = assets
      .map((coin) => {
        if (coin.Name === coinData.name) {
          return {
            ...coin,
            Quantity: coin.Quantity - quantity,
            InvestedAmount: coin.InvestedAmount - requiredAmount,
          };
        }

        return coin;
      })
      .filter((coin) => coin.Quantity > 0);
    await AsyncStorage.setItem("@balance", JSON.stringify(updatedBalance));

    handleAssetsChange(updateAssets);

    Alert.alert("Sell Order", "Your sell order has been placed", [
      {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      },
      {
        text: "go to profile ",
        onPress: () => navigation.navigate("profile"),
      },
    ]);
    dispatch(setQuantity(""));
    dispatch(setRequiredAmount(0));
  };

  useEffect(() => {
    dispatch(
      setMarketPrice(coinData?.market_data?.current_price?.inr.toFixed(2))
    );
  }, [coinData]);

  return (
    <View style={styles.mainContent}>
      <View style={styles.quantity}>
        <View style={styles.sideHeaders}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Qty
          </Text>
          <TextInput
            cursorColor="white"
            value={quantity}
            placeholder="0"
            onChangeText={(text) => dispatch(setQuantity(text))}
            keyboardType="numeric"
            style={styles.textInput}
          />
        </View>
        <View style={styles.sideHeaders}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Market price
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            ₹{coinData?.market_data?.current_price?.inr.toFixed(2)}
          </Text>
        </View>
        <View style={styles.sideHeaders}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Required
          </Text>
          <Text
            style={{
              color: requiredAmount > balanceLeft ? "red" : "green",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            ₹{requiredAmount}
          </Text>
        </View>
      </View>
      <Button handleBuy={handleBuy} handleSell={handleSell} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    height: "85%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  quantity: {
    display: "flex",
    flexDirection: "column",
    height: 130,
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 12,
    borderWidth: 0.5,
  },
  sideHeaders: {
    height: "50%",
    widht: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    width: "40%",
    height: "70%",
    backgroundColor: "grey",
    color: "white",
    borderRadius: 5,
    padding: 5,
    textAlign: "right",
    fontSize: 25,
  },
});

export default MainContent;
