import { createSlice } from "@reduxjs/toolkit";

export const postReducer = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {},
});

export default postReducer.reducer;
