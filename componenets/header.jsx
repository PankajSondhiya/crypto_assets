import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchBar, setSearchText } from "../slice/coin";

const Header = () => {
  const { searchBar, searchText } = useSelector((state) => state.homePage);
  const dispatch = useDispatch();

  return (
    <View style={styles.header}>
      {searchBar ? (
        <TextInput
          cursorColor="orange"
          value={searchText}
          onChangeText={(text) => dispatch(setSearchText(text))}
          style={{
            width: "100%",
            height: "70%",
            backgroundColor: "black",
            color: "orange",

            borderColor: "grey",
            paddingHorizontal: 12,
            borderRadius: 12,
            borderWidth: 2,
            fontSize: 18,
          }}
        />
      ) : (
        <Text style={{ color: "orange", fontSize: 20, fontWeight: "bold" }}>
          Crypto Tracker
        </Text>
      )}

      <FontAwesome
        style={{
          position: "absolute",
          right: 18,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        name="search"
        size={24}
        color="orange"
        onPress={() => dispatch(setSearchBar())}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 12,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Header;
