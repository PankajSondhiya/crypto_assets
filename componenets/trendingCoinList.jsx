import { color } from "@rneui/base";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import TrendingCoins from "./trendingCoins";
import { Text } from "react-native";

const TrendingCoinList = ({ navigation }) => {
  const { data, loading, isError } = useSelector(
    (store) => store.homePage.trendingCoinsData
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} color={"orange"} />
      ) : (
        <View style={styles.trendingCoins}>
          <View>
            <Text style={{ color: "white", fontSize: 16, marginVertical: 5 }}>
              Trending coins
            </Text>
          </View>
          <FlatList
            horizontal={true}
            data={data}
            renderItem={({ item }) => (
              <TrendingCoins coin={item} navigation={navigation} />
            )}
            keyExtractor={(coin) => coin.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  trendingCoins: {
    backgroundColor: "black",
    paddingHorizontal: 12,
  },
});

export default TrendingCoinList;
