import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  status: "start",
  categories: { list: [], urlString: "" },
  difficulty: "",
  highscore: 0,
  score: 0,
  timer: { duration: 60, started: true },
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setCategory: (state, action) => {
      const newCategory = action.payload;
      const currentCategories = [...state.categories.list];

      if (currentCategories.includes(newCategory)) {
        const index = currentCategories.indexOf(newCategory);
        currentCategories.splice(index, 1);
      } else {
        currentCategories.push(newCategory);
      }

      state.categories.list = currentCategories;

      quizSlice.caseReducers.setCategoryString(state);
    },
    setCategoryString: (state) => {
      state.categories.urlString = state.categories.list
        .join(",")
        .toLowerCase()
        .replace(/ /g, "_");
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    setHighScore: (state, action) => {
      const highscores = action.payload.map((obj) => obj.highscore); // convert objects to array of scores
      if (highscores.length) {
        state.highscore = Math.max.apply(Math, highscores);
      }
    },
    newHighScore: (state, action) => {
      state.highscore = action.payload;
    },
    restartGame: (state) => {
      state.score = 0;
      state.status = "menu";
    },
    toggleTimerStarted: (state) => {
      state.timer.started = !state.timer.started;
    },
  },
});

export const {
  setStatus,
  setScore,
  setCategory,
  setDifficulty,
  setHighScore,
  newHighScore,
  restartGame,
  toggleTimerStarted,
} = quizSlice.actions;

export default quizSlice.reducer;
