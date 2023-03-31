import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStatus: "start",
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },
  },
});

export const { setGameStatus } = quizSlice.actions;

export default quizSlice.reducer;
