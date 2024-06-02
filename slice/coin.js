import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTrendingCoinsService } from "../services/trendingCoin";
import { fetchCoinService } from "../services/coinslist";
import { setBalanceLeft } from "./asset.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchCoins = createAsyncThunk("fetchCoins", fetchCoinService);
export const fetchTrendingCoins = createAsyncThunk(
  "fetchTrendingCoins",
  fetchTrendingCoinsService
);

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    showModal: false,
    searchBar: false,
    searchText: "",
    trendingCoinsData: {
      loading: false,
      data: [],
      isError: false,
    },
    coinsData: {
      loading: false,
      data: [],
      isError: false,
    },
    priceChangeIndex: 0,
    sortBy: "rank",
  },
  reducers: {
    setloading(state) {
      state.loading = !state.loading;
    },
    setShowmodal(state) {
      state.showModal = !state.showModal;
    },
    setSearchBar(state) {
      state.searchBar = !state.searchBar;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setPriceChangeIndex(state, action) {
      state.priceChangeIndex = action.payload;
    },
    setBalance(state, action) {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state, action) => {
      state.coinsData.isError = false;
      state.coinsData.loading = true;
    });
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.coinsData.loading = false;
      state.coinsData.isError = false;
      state.coinsData.data = action.payload;
    });
    builder.addCase(fetchCoins.rejected, (state, action) => {
      state.coinsData.loading = false;
      state.coinsData.isError = true;
    });

    builder.addCase(fetchTrendingCoins.pending, (state, action) => {
      state.trendingCoinsData.isError = false;
      state.trendingCoinsData.loading = true;
    });
    builder.addCase(fetchTrendingCoins.fulfilled, (state, action) => {
      state.trendingCoinsData.loading = false;
      state.trendingCoinsData.isError = false;
      state.trendingCoinsData.data = action.payload;
    });

    builder.addCase(fetchTrendingCoins.rejected, (state, action) => {
      state.trendingCoinsData.loading = false;
      state.trendingCoinsData.isError = true;
    });
  },
});
export const {
  setloading,
  setShowmodal,
  setSearchText,
  setSearchBar,
  setSortBy,

  setPriceChangeIndex,
} = homePageSlice.actions;

export default homePageSlice.reducer;
