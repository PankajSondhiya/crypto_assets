import {
  Pressable,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";

import { useSelector } from "react-redux";

const Button = ({ handleSell, handleBuy }) => {
  const isDisabled = quantity === "" || quantity === "0";
  const { balanceLeft, quantity } = useSelector((store) => store.assets);
  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={{
        height: "10%",
        width: "100%",
        paddingHorizontal: 15,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: "grey",
            fontSize: 15,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Balance:
        </Text>
        <Text
          style={{
            color: "grey",
            fontSize: 15,
            fontWeight: "bold",
            marginLeft: 5,
          }}
        >
          ₹ {balanceLeft}
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Pressable
          style={[styles.buyButton, isDisabled && styles.buttonDisabled]}
          onPress={handleBuy}
          disabled={isDisabled}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
            Buy
          </Text>
        </Pressable>
        <Pressable
          style={[styles.sellButton, isDisabled && styles.buttonDisabled]}
          onPress={handleSell}
          disabled={isDisabled}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
            Sell
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  sellButton: {
    marginLeft: 4,
    flex: 1,
    backgroundColor: "orange",
    height: "100%",
    width: "100%",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "grey",
  },
  buyButton: {
    flex: 1,
    backgroundColor: "orange",
    height: "100%",
    width: "100%",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
