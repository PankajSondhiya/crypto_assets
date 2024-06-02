import { createSlice } from "@reduxjs/toolkit";

const assetsSlice = createSlice({
  name: "assets",
  initialState: {
    balanceLeft: "",
    assets: [],
    quantity: "",
    requiredAmount: 0,
    marketPrice: "",
  },
  reducers: {
    setQuantity(state, action) {
      state.quantity = action.payload;
    },
    setMarketPrice(state, action) {
      state.marketPrice = action.payload;
    },
    setRequiredAmount(state, action) {
      state.requiredAmount = action.payload;
    },
    setAssets(state, action) {
      state.assets = action.payload;
    },
    setBalanceLeft(state, action) {
      state.balanceLeft = action.payload;
    },
  },
});

export const {
  setBalanceLeft,
  setQuantity,
  setRequiredAmount,
  setAssets,
  setMarketPrice,
} = assetsSlice.actions;

export default assetsSlice.reducer;
