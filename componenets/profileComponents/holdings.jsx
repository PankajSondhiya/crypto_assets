import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const Holdings = () => {
  const { balanceLeft, assets } = useSelector((store) => store.assets);
  const currentInvestment = assets?.reduce(
    (total, coin) => total + Number(coin.InvestedAmount),
    0
  );
  const totalCurrentPrices = assets?.reduce(
    (total, coin) => total + Number(coin.marketPrice * coin.Quantity),
    0
  );

  const totalReturnPercentage =
    ((totalCurrentPrices - currentInvestment) / currentInvestment) * 100;
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20%",
        width: "100%",
      }}
    >
      <View style={styles.holdings}>
        <View style={styles.current}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{ color: "#D3D3D3", fontSize: 15, fontWeight: "bold" }}
            >
              Current
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                color: totalReturnPercentage >= 0 ? "green" : "red",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {totalCurrentPrices ? totalCurrentPrices.toFixed(2) : 0}₹
            </Text>
          </View>
        </View>
        <View style={styles.invested}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{ color: "#D3D3D3", fontSize: 15, fontWeight: "bold" }}
            >
              Invested
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                color: "green",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {currentInvestment ? currentInvestment.toFixed(2) : 0} ₹
            </Text>
          </View>
        </View>
        <View style={styles.totalProfit}>
          <View
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#D3D3D3", fontSize: 15, fontWeight: "bold" }}
            >
              Return
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                color: totalReturnPercentage >= 0 ? "green" : "red",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {(totalCurrentPrices - currentInvestment).toFixed(2)}
            </Text>
            <Text
              style={{
                color: totalReturnPercentage >= 0 ? "green" : "red",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              {totalReturnPercentage ? totalReturnPercentage.toFixed(2) : 0.0}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  holdings: {
    marginTop: 10,
    height: "100%",
    width: "90%",
    padding: 4,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "grey",
  },
  current: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 5,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalProfit: {
    flex: 1,
    width: "100%",
    // paddingTop: 15,
    paddingHorizontal: 5,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  invested: {
    flex: 1,
    width: "100%",
    // paddingTop: 15,
    paddingHorizontal: 5,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
});

export default Holdings;
