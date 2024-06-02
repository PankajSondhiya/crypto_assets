import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Header = () => {
  const { coinData, loading, isError } = useSelector(
    (store) => store.coinDetailPage.coinDetail
  );
  const navigation = useNavigation();
  return (
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
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: 10,
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
          {coinData.name}
        </Text>
        <Text
          style={{
            color:
              coinData.market_data &&
              coinData.market_data.price_change_percentage_24h > 0
                ? "green"
                : "red",
            fontSize: 12,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          {/* {marketPrice} */}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingLeft: 15,
    paddingRight: 15,
    height: "10%",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
