import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setShowmodal, setSortBy } from "../slice/coin";

const SortBy = () => {
  const { showModal, sortBy } = useSelector((store) => store.homePage);
  const { data, isError, loading } = useSelector(
    (store) => store.homePage.coinsData
  );

  const dispatch = useDispatch();

  return (
    <Modal visible={showModal} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={() => dispatch(setShowmodal())}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Text style={{ color: "orange", fontSize: 16 }}>Sort by</Text>
            </View>
            <TouchableOpacity
              style={styles.sortListView}
              onPress={() => {
                dispatch(setSortBy("name"));
                dispatch(setShowmodal());
              }}
            >
              <Text style={styles.sortingList}>Name</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sortListView}
              onPress={() => {
                dispatch(setSortBy("rank"));
                dispatch(setShowmodal());
              }}
            >
              <Text style={styles.sortingList}>Rank</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sortListView}
              onPress={() => {
                dispatch(setSortBy("24hChange"));
                dispatch(setShowmodal());
              }}
            >
              <Text style={styles.sortingList}>24h %change</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortListView}
              onPress={() => {
                dispatch(setSortBy("currentPrice"));
                dispatch(setShowmodal());
              }}
            >
              <Text style={styles.sortingList}>Current Price</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const styles = StyleSheet.create({
  sortBy: {
    borderRadius: 50,
    fontSize: 15,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "orange",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: "30%",
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
  },
  sortListView: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 4,
  },
  sortingList: {
    color: "grey",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 3,
  },
});

export default SortBy;
