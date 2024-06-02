import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HoidingList = ({ coin }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingHorizontal: 8,
      }}
      onPress={() => navigation.navigate("coinDetails", { coinId: coin.id })}
    >
      <View style={styles.coin}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
            {coin.Name}
          </Text>
          <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
            qty: {coin.Quantity}
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: "grey",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
            {coin.InvestedAmount.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: "green",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
            {Number(
              coin.Quantity * coin.marketPrice - coin.InvestedAmount
            ).toFixed(2)}
            ₹
          </Text>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
            {Number(coin.marketPrice).toFixed(2)}₹
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  coin: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    widht: "100%",
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default HoidingList;
