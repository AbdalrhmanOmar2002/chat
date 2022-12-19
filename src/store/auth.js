import { createSlice } from "@reduxjs/toolkit";

export const chatsSlice = createSlice({
  name: "chats",
  initialState: { chatId: null, user: {} },
  reducers: {
    chatId: (state, action) => {
      state.chatId = action.payload;
    },
    user: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const chatsActin = chatsSlice.actions;
