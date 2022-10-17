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
      const currentMatch = action.payload;
      const answerPlayerOne = action.payload.playerOne;
      const answerPlayerTwo = action.payload.playerTwo;
      if (!state.answer[currentMatch.match]) {
        state.answer[currentMatch.match] = {
          [answerPlayerOne]: "",
          [answerPlayerTwo]: "",
          answerApi: "",
          win: [],
        };
      }
      state.answer[currentMatch.match][answerPlayerOne] =
        currentMatch.answerPlayerOne;
      state.answer[currentMatch.match][answerPlayerTwo] =
        currentMatch.answerPlayerTwo;
      state.answer[currentMatch.match].answerApi = currentMatch.answerApi;
      if (currentMatch.answerPlayerOne === currentMatch.answerApi) {
        state.answer[currentMatch.match].win = [answerPlayerOne];
      }
      if (currentMatch.answerPlayerTwo === currentMatch.answerApi) {
        state.answer[currentMatch.match].win = [answerPlayerTwo];
      }
      if (
        currentMatch.answerPlayerOne === currentMatch.answerApi &&
        currentMatch.answerPlayerTwo === currentMatch.answerApi
      ) {
        state.answer[currentMatch.match].win = [
          answerPlayerOne,
          answerPlayerTwo,
        ];
      }
    },
    searchPlayerName: (state, action) => {},
  },
});

export const { addUser, addMatch, dataAnswer, searchPlayerName, reset } =
  userSlice.actions;
export default userSlice.reducer;
