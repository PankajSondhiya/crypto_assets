import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";

import { memo, useCallback, useEffect, useState } from "react";
import { LineChart } from "react-native-wagmi-charts";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  ChartDetail,
  CoinDetail,
  setActiveTimeRange,
} from "../../slice/coinDetail.slice";
import CoinDetailHeader from "../../componenets/coinDetailComponents/coindetailHeader";
import TimeFrame from "../../componenets/coinDetailComponents/timeFrame";
import { useNavigation } from "@react-navigation/native";
import CoinDetailBUtton from "../../componenets/coinDetailComponents/coinDetailButton";

const Coindetail = ({ route }) => {
  const { activeTimeRange } = useSelector((store) => store.coinDetailPage);
  const navigation = useNavigation();
  const { coinId } = route.params;
  const { chartData, chartDataLoading, chartDataError } = useSelector(
    (store) => store.coinDetailPage.chartDetail
  );
  const { coinData, loading, isError } = useSelector(
    (store) => store.coinDetailPage.coinDetail
  );

  const dispatch = useDispatch();
  const fetchChartData = useCallback(() => {
    dispatch(ChartDetail({ id: coinId, timeRange: activeTimeRange }));
  }, [dispatch, coinId, activeTimeRange]);

  const fetchCoinData = useCallback(() => {
    dispatch(CoinDetail(coinId));
  }, [dispatch, coinId]);

  useEffect(() => {
    fetchChartData();
    fetchCoinData();
  }, [dispatch, fetchChartData, fetchCoinData]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <CoinDetailHeader navigation={navigation} />
        <View style={styles.chartContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <View style={styles.chart}>
                {chartDataLoading ? (
                  <ActivityIndicator size="large" color={"orange"} />
                ) : chartData && chartData.length > 0 ? (
                  <LineChart.Provider data={chartData}>
                    <LineChart width={375} height={350}>
                      <LineChart.Path color="orange" width={1}>
                        <LineChart.CursorLine textStyle={{ color: "grey" }} />
                        <LineChart.CursorCrosshair />
                        <LineChart.HorizontalLine color="grey" />
                      </LineChart.Path>
                      <LineChart.Tooltip
                        textStyle={{
                          backgroundColor: "black",
                          borderRadius: 4,
                          color: "white",
                          fontSize: 18,
                          padding: 4,
                        }}
                      />
                      <LineChart.CursorCrosshair />
                    </LineChart>
                  </LineChart.Provider>
                ) : (
                  <Text style={{ color: "white" }}>No data available</Text>
                )}
              </View>

              <TimeFrame />
              <View style={styles.stats}>
                <View style={styles.dayHigh}>
                  <View>
                    <Text style={styles.time}>24h low</Text>
                    <Text style={styles.data}>
                      {coinData?.market_data?.low_24h?.inr}
                    </Text>
                  </View>
                  <View style={styles.dayLow}>
                    <Text style={styles.time}>24h high</Text>
                    <Text style={styles.data}>
                      {coinData?.market_data?.high_24h?.inr}
                    </Text>
                  </View>
                </View>
                {/* <View style={styles.coinInfo}>
                  <View style={styles.headers}>
                    <Text style={styles.time}>Genesis date</Text>
                    <Text style={styles.time}>Total volume</Text>
                    <Text style={styles.time}>Market cap</Text>
                  </View>
                  <View style={styles.values}></View>
                </View> */}
              </View>
            </View>
          </ScrollView>
        </View>
        <CoinDetailBUtton />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  headers: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  values: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  stats: {
    marginTop: 20,
    padding: 5,
    width: "100%",
    borderRadius: 0.5,
    // borderBottomColor: "grey",
    // borderBottomWidth: 1,
  },
  coinInfo: {
    marginTop: 20,
    padding: 5,
    width: "100%",
    borderRadius: 0.5,
    display: "flex",
    flexDirection: "row",
  },
  time: {
    color: "grey",
    fontSize: 14,
    fontWeight: "bold",
  },
  data: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  subHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  dayHigh: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  chartContainer: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },

  chart: {
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "90%",
    aspectRatio: 1,
  },
});

export default Coindetail;
