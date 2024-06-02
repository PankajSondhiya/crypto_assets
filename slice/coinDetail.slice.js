import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setloading } from "./coin";
import fetchCoinDetail from "../services/coinDetail";
import { fetchChartDetails } from "../services/chartDetail";
import axios from "axios";

export const CoinDetail = createAsyncThunk("CoinDetail", fetchCoinDetail);
export const ChartDetail = createAsyncThunk(
  "fetchChartDetails",
  fetchChartDetails
);

const CoinDetailPageSlice = createSlice({
  name: "coinDetailPage",
  initialState: {
    watchList: [],
    currentItemToWatchList: false,
    detailLoading: false,
    coinDetail: {
      coinData: {},
      loading: false,
      isError: false,
    },
    chartDetail: {
      chartData: [],
      chartDataError: false,
      chartDataLoading: false,
    },
    chartLoading: false,
    activeTimeRange: 1,
  },
  reducers: {
    setloading(state, action) {
      state.detailLoading = !state.detailLoading;
    },
    setActiveTimeRange(state, action) {
      state.activeTimeRange = action.payload;
    },
    setCurrentItemToWatchList(state, action) {
      state.currentItemToWatchList = !state.currentItemToWatchList;
    },
    setWatchList(state, action) {
      state.watchList = [...action.payload];
      // switch (action.payload.type) {
      //   case "add":
      //     return {
      //       ...state,
      //       watchList: [...state.watchList, action.payload.item],
      //     };
      //   case "remove":
      //     return {
      //       ...state,
      //       watchList: state.watchList.filter(
      //         (coin) => coin !== action.payload.item
      //       ),
      //     };
      //   default:
      //     return state;
      // }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CoinDetail.pending, (state, action) => {
      state.coinDetail.isError = false;
      state.coinDetail.loading = true;
    });

    builder.addCase(CoinDetail.fulfilled, (state, action) => {
      state.coinDetail.loading = false;
      state.coinDetail.coinData = action.payload;
      state.coinDetail.isError = false;
    });

    builder.addCase(CoinDetail.rejected, (state, action) => {
      state.coinDetail.isError = true;
      state.coinDetail.chartData = {};
      state.coinDetail.loading = false;
    });
    builder.addCase(ChartDetail.pending, (state, action) => {
      state.chartDetail.chartDataError = false;
      state.chartDetail.chartDataLoading = true;
    });

    builder.addCase(ChartDetail.fulfilled, (state, action) => {
      state.chartDetail.chartDataLoading = false;
      state.chartDetail.chartData = action.payload;
      state.chartDetail.chartDataError = false;
    });

    builder.addCase(ChartDetail.rejected, (state, action) => {
      state.chartDetail.chartDataError = true;
      state.chartDetail.chartDataLoading = false;
    });
  },
});

export const { setActiveTimeRange, setWatchList, setCurrentItemToWatchList } =
  CoinDetailPageSlice.actions;

export default CoinDetailPageSlice.reducer;
