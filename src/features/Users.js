import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    limitMatch: 0,
    answer: {},
  },
  reducers: {
    reset: (state, action) => {
      if (action.type === "users/reset") {
        state.users = [];
        state.limitMatch = 0;
        state.answer = {};

        return;
      }
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    addMatch: (state, action) => {
      const limit = Number(action.payload.limitMatch);
      state.limitMatch = state.limitMatch + limit;
    },
    dataAnswer: (state, action) => {
      state.answer = action.payload;
    },
    searchPlayerName: (state, action) => {
      Object.keys(state.history).forEach((name) => {
        if (
          action.payload.searchNamePlayer === undefined ||
          action.payload.searchNamePlayer === "" ||
          name === action.payload.searchNamePlayer
        ) {
          state.answer[name].isValid = true;
        } else {
          state.answer[name].isValid = false;
        }
      });
    },
  },
});

export const { addUser, addMatch, dataAnswer, searchPlayerName, reset } =
  userSlice.actions;
export default userSlice.reducer;
