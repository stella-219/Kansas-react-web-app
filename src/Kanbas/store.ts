import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import questionReducer from "./Courses/Quizzes/QuestionEditor/reducer";
import accountReducer from "./Account/reducer";
import quizzesReducer from "./Courses/Quizzes/QuizEntry/reducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    questionReducer,
    accountReducer,
    quizzesReducer,
  },
});
export default store;