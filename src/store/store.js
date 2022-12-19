import { configureStore } from "@reduxjs/toolkit";
import { chatsSlice } from "./auth";

export const store = configureStore({
  reducer: {
    auth: chatsSlice.reducer,
  },
});
