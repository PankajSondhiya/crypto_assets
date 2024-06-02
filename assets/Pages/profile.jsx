import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setAssets,
  setBalanceLeft,
  setQuantity,
} from "../../slice/asset.slice";

import {
  FlatList,
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import HoidingList from "../../componenets/profileComponents/coinlist";
import Header from "../../componenets/profileComponents/header";
import Holdings from "../../componenets/profileComponents/holdings";
import HoldingList from "../../componenets/profileComponents/holdingList";
const Profile = () => {
  const navigation = useNavigation();
  const { balanceLeft, assets } = useSelector((store) => store.assets);
  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);

  const getAssests = async () => {
    try {
      const storedAssets = await AsyncStorage.getItem("@assets");
      const totalbuys = JSON.parse(storedAssets);
      dispatch(setAssets(totalbuys));
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };
  const getBalance = async () => {
    try {
      const value = await AsyncStorage.getItem("@balance");
      const leftbalance = value !== null ? JSON.parse(value) : balanceLeft;

      dispatch(setBalanceLeft(leftbalance));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAssests();
    getBalance();
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.profileContainer}>
        <Header />
        <View style={styles.balance}>
          <Text style={{ color: "#D3D3D3", fontSize: 25, fontWeight: "bold" }}>
            Balance
          </Text>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {balanceLeft}₹
          </Text>
        </View>
        <Text
          style={{
            color: "#D3D3D3",
            fontSize: 16,
            fontWeight: "bold",
            marginHorizontal: 18,
            marginTop: 15,
            marginBottom: 8,
          }}
        >
          Holdings
        </Text>
        <Holdings />
        <View
          style={{
            width: "100%",
            marginTop: 20,
            paddingHorizontal: 5,
          }}
        >
          <HoldingList />
          {assets ? (
            <FlatList
              data={assets}
              renderItem={({ item }) => <HoidingList coin={item} />}
            />
          ) : (
            <Text
              style={{
                color: "#D3D3D3",
                fontSize: 15,
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              no coins to display
            </Text>
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
  },

  balance: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 5,
  },

  holdingList: {
    widht: "100%",
  },
});
export default Profile;
