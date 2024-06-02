import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Header = () => {
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
          justifyContent: "center",
          alignItems: "center",
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
          My Profile
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
});

export default Header;
