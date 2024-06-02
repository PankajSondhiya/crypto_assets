import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
const CoinList = ({ coin }) => {
  const navigation = useNavigation();

  const { priceChangeIndex } = useSelector((store) => store.homePage);
  function oneDayMarketChange(coin) {
    switch (priceChangeIndex) {
      case 0:
        return coin.current_price;

      case 1:
        return coin.high_24h;

      case 2:
        return coin.low_24h;
      default:
        return;
    }
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.listContainer, { justifyContent: "space-between" }]}
        key={coin.id}
        onPress={() => navigation.navigate("coinDetails", { coinId: coin.id })}
      >
        <View style={styles.leftContainer}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={coin.image} style={{ height: 33, width: 33 }} />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "grey",
              }}
            >
              {coin.symbol}
            </Text>
          </View>

          <View style={styles.titleInfo}>
            <View>
              <Text style={styles.title}>{coin.name}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: "50%",
              }}
            >
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{coin.market_cap_rank}</Text>
              </View>
              <Text
                style={{
                  color:
                    coin.price_change_percentage_24h > 0 ? "#00FF00" : "red",
                  marginLeft: 7,
                  fontSize: 16,
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)} %
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerRight}>
          <Text style={styles.currentPrice}>{oneDayMarketChange(coin)}₹</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#121212",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  containerRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    color: "#00FF00",
  },

  leftContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    marginLeft: 2,
    fontSize: 17,
  },

  titleInfo: {
    marginLeft: 8,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  currentPrice: {
    color: "white",
    fontSize: 15,
  },
  listContainer: {
    paddingLeft: 10,
    paddingRight: 8,
    height: 70,
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
});

export default CoinList;
