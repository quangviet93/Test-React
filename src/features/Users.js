import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    limitMatch: 0,
    answer: {},
    history: {},
  },
  reducers: {
    reset: (state, action) => {
      if (action.type === "users/reset") {
        state.users = [];
        state.limitMatch = 0;
        state.answer = {};
        state.history = {};

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
      console.log("currentMatch", currentMatch);
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
      if (!state.history[currentMatch.playerOne]) {
        state.history[currentMatch.playerOne] = {
          name: "",
          answer: [],
          answerApi: [],
          score: 0,
          isValid: true,
        };
      }
      if (!state.history[currentMatch.playerTwo]) {
        state.history[currentMatch.playerTwo] = {
          name: "",
          answer: [],
          answerApi: [],
          score: 0,
          isValid: true,
        };
      }
      state.history[currentMatch.playerTwo].name = currentMatch.playerTwo;
      state.history[currentMatch.playerTwo].answer.push(
        currentMatch.answerPlayerTwo
      );
      state.history[currentMatch.playerTwo].answerApi.push(
        currentMatch.answerApi
      );
      state.history[currentMatch.playerOne].name = currentMatch.playerOne;
      state.history[currentMatch.playerOne].answer.push(
        currentMatch.answerPlayerOne
      );
      state.history[currentMatch.playerOne].answerApi.push(
        currentMatch.answerApi
      );
      state.answer[currentMatch.match][answerPlayerOne] =
        currentMatch.answerPlayerOne;
      state.answer[currentMatch.match][answerPlayerTwo] =
        currentMatch.answerPlayerTwo;
      state.answer[currentMatch.match].answerApi = currentMatch.answerApi;
      if (currentMatch.answerPlayerOne === currentMatch.answerApi) {
        state.answer[currentMatch.match].win = [answerPlayerOne];
        state.history[currentMatch.playerOne].score =
          state.history[currentMatch.playerOne].score + 1;
      }
      if (currentMatch.answerPlayerTwo === currentMatch.answerApi) {
        state.answer[currentMatch.match].win = [answerPlayerTwo];
        state.history[currentMatch.playerTwo].score =
          state.history[currentMatch.playerTwo].score + 1;
      }
      if (
        currentMatch.answerPlayerOne === currentMatch.answerApi &&
        currentMatch.answerPlayerTwo === currentMatch.answerApi
      ) {
        state.history[currentMatch.playerOne].score =
          state.history[currentMatch.playerOne].score + 1;
        state.history[currentMatch.playerTwo].score =
          state.history[currentMatch.playerTwo].score + 1;
        state.answer[currentMatch.match].win = [
          answerPlayerOne,
          answerPlayerTwo,
        ];
      }
    },
    searchPlayerName: (state, action) => {
      Object.keys(state.history).forEach((name) => {
        if (
          action.payload.searchNamePlayer === undefined ||
          action.payload.searchNamePlayer === "" ||
          name === action.payload.searchNamePlayer
        ) {
          state.history[name].isValid = true;
        } else {
          state.history[name].isValid = false;
        }
      });
    },
  },
});

export const { addUser, addMatch, dataAnswer, searchPlayerName, reset } =
  userSlice.actions;
export default userSlice.reducer;
