import { createSlice, current } from "@reduxjs/toolkit";
import { scoreValue } from "../constants";

const initialState = {
  status: "start",
  categories: { list: [], urlString: "" },
  difficulty: "",
  questions: [],
  current: {
    question: "",
    difficulty: "",
    correct: "",
    incorrect: [],
  },
  isCorrect: false,
  showAnswer: false,
  highscore: 0,
  score: 0,
  previousScore: 0,
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
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.current = action.payload;
    },
    correctAnswer: (state) => {
      const points = scoreValue[state.current.difficulty];
      state.isCorrect = true;
      state.previousScore = state.score;
      state.score += points;
    },
    resetCurrent: (state) => {
      state.isCorrect = false;
      state.showAnswer = false;

      if (state.questions.length) {
        const Q = state.questions[0];
        state.current.question = Q.question;
        state.current.difficulty = Q.difficulty;
        state.current.correct = Q.correctAnswer;
        state.current.incorrect = Q.incorrectAnswers;
      }
    },
    resetRound: (state) => {
      state.score = 0;
      state.timer.started = false;
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
      state.timer.started = false;
    },
    setShowAnswer: (state) => {
      state.showAnswer = true;
    },
  },
});

export const {
  setStatus,
  setScore,
  setCategory,
  setDifficulty,
  setQuestions,
  setCurrentQuestion,
  correctAnswer,
  resetCurrent,
  resetRound,
  setHighScore,
  newHighScore,
  restartGame,
  setShowAnswer,
} = quizSlice.actions;

export default quizSlice.reducer;
