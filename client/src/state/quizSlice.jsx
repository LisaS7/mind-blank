import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStatus: { intro: true },
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
});

export default quizSlice.reducer;
