import { createSlice } from "@reduxjs/toolkit";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";


export const chatsSlice = createSlice({

  name: "chats",
  initialState: { chatId: null, user: {} },
  reducers: {
    chatId: (state, action) => {
    },
    user: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const chatsActin = chatsSlice.actions;
