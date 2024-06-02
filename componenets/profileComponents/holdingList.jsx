import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const HoldingList = () => {
  return (
    <View style={styles.holdingsHeader}>
      <View>
        <Text style={{ color: "#D3D3D3", fontSize: 15, fontWeight: "bold" }}>
          Coin
        </Text>
      </View>
      <View>
        <Text style={{ color: "#D3D3D3", fontSize: 15, fontWeight: "bold" }}>
          Invested
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ color: "#D3D3D3", fontSize: 15, fontWeight: "bold" }}>
          Profit
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="arrowdown" size={12} color="#D3D3D3" />
          <AntDesign name="arrowup" size={12} color="#D3D3D3" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  holdingsHeader: {
    marginTop: 10,
    paddingHorizontal: 15,
    height: 40,
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
  },
});

export default HoldingList;
