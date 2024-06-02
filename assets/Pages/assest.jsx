import { StyleSheet, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useMemo, useState } from "react";
import assetSlice, {
  setAssets,
  setBalance,
  setBalanceLeft,
  setQuantity,
  setRequiredAmount,
} from "../../slice/asset.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../componenets/assetsComponents/header";
import MainContent from "../../componenets/assetsComponents/mainContent";

const Assets = () => {
  const { quantity, requiredAmount, balanceLeft, assets } = useSelector(
    (store) => store.assets
  );

  const [initialBalance, setInitialBalance] = useState("20000000000000");

  const dispatch = useDispatch();
  const { coinData, loading, isError } = useSelector(
    (store) => store.coinDetailPage.coinDetail
  );

  const need = () => {
    let totalAmount;
    if (quantity === "") {
      totalAmount = 0;
      dispatch(setRequiredAmount(totalAmount));
    } else {
      totalAmount = quantity * coinData?.market_data?.current_price?.inr;
      dispatch(setRequiredAmount(totalAmount));
    }
  };

  useEffect(() => {
    need();
  }, [dispatch, quantity, requiredAmount]);

  useEffect(() => {
    updateBalance();
  }, [quantity, requiredAmount]);

  const updateBalance = async () => {
    const balance = await AsyncStorage.getItem("@balance");
    let parsedBalance = balance !== null ? JSON.parse(balance) : initialBalance;

    const remainingBalance = parsedBalance - requiredAmount;
    dispatch(setBalanceLeft(remainingBalance));
  };

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header />
          <MainContent />
        </View>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
  },
});

export default Assets;
