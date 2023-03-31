import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "start",
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = quizSlice.actions;

export default quizSlice.reducer;
