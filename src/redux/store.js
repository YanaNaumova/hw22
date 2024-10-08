import { configureStore } from "@reduxjs/toolkit";
import quote from "./features/quote/quoteSlice";

const store = configureStore({
  reducer: {
    quote,
  },
});

export default store;
