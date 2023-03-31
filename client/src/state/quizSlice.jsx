import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  status: "start",
  categories: { list: [], urlString: "" },
  difficulty: "",
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
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
      console.log(current(state.categories));
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
  },
});

export const { setStatus, setCategory, setDifficulty } = quizSlice.actions;

export default quizSlice.reducer;
