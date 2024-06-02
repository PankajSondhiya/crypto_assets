import { StyleSheet, Text, View } from "react-native";
import { setActiveTimeRange } from "../../slice/coinDetail.slice";
import { useDispatch, useSelector } from "react-redux";

const TimeFrame = () => {
  const { activeTimeRange } = useSelector((store) => store.coinDetailPage);
  const dispatch = useDispatch();
  return (
    <View style={styles.timeFrames}>
      <View
        style={[
          styles.sortBy,
          { backgroundColor: activeTimeRange === 1 ? "grey" : "black" },
        ]}
      >
        <Text
          style={styles.timeStamp}
          onPress={() => dispatch(setActiveTimeRange(1))}
        >
          1d
        </Text>
      </View>
      <View
        style={[
          styles.sortBy,
          { backgroundColor: activeTimeRange === 7 ? "grey" : "black" },
        ]}
      >
        <Text
          style={styles.timeStamp}
          onPress={() => dispatch(setActiveTimeRange(7))}
        >
          1w
        </Text>
      </View>
      <View
        style={[
          styles.sortBy,
          { backgroundColor: activeTimeRange === 30 ? "grey" : "black" },
        ]}
      >
        <Text
          style={styles.timeStamp}
          onPress={() => dispatch(setActiveTimeRange(30))}
        >
          1m
        </Text>
      </View>
      <View
        style={[
          styles.sortBy,
          { backgroundColor: activeTimeRange === 90 ? "grey" : "black" },
        ]}
      >
        <Text
          style={styles.timeStamp}
          onPress={() => dispatch(setActiveTimeRange(90))}
        >
          3m
        </Text>
      </View>
      <View
        style={[
          styles.sortBy,
          {
            backgroundColor: activeTimeRange === 365 ? "grey" : "black",
          },
        ]}
      >
        <Text
          style={styles.timeStamp}
          onPress={() => dispatch(setActiveTimeRange(365))}
        >
          1y
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  timeFrames: {
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",

    width: "90%",
    borderColor: "grey",
    borderWidth: 1,
  },
  timeStamp: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  sortBy: {
    flex: 1,
    padding: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TimeFrame;
