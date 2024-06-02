import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CoinDetailBUtton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={{
          backgroundColor: "grey",
          flex: 1,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 5,
        }}
        onPress={() => navigation.navigate("assets")}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
          Buy
        </Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "grey",
          flex: 1,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 5,
        }}
        onPress={() => navigation.navigate("assets")}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
          sell
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    height: "5%",
    width: "100%",
    paddingHorizontal: 15,
  },
});

export default CoinDetailBUtton;
