import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
const TrendingCoins = ({ navigation, coin }) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.coin}
      key={coin.id}
      onPress={() => navigation.navigate("coinDetails", { coinId: coin.id })}
    >
      <Image src={coin.image} style={{ height: 40, width: 40 }} />
      <Text style={{ color: "white", marginTop: 3 }}> {coin.name}</Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {coin.price_change_percentage_24h &&
        coin.price_change_percentage_24h > 0 ? (
          <AntDesign name="caretup" size={18} color="#00FF00" />
        ) : (
          <AntDesign name="caretdown" size={18} color="red" />
        )}
        <Text
          style={{
            color: coin.price_change_percentage_24h > 0 ? "#00FF00" : "red",
            marginLeft: 3,
          }}
        >
          {coin.price_change_percentage_24h}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  coin: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    height: 110,
    width: 110,
    backgroundColor: "black",
    borderColor: "grey",
    borderWidth: 1,
    color: "white",
    margin: 5,
    borderRadius: 8,
  },
});

export default TrendingCoins;
