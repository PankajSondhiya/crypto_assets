import { configureStore } from "@reduxjs/toolkit";
import homePage from "./coin";
import coinDetailPage from "./coinDetail.slice";
import assets from "./asset.slice";

export const store = configureStore({
  reducer: {
    homePage,
    coinDetailPage,
    assets,
  },
});
