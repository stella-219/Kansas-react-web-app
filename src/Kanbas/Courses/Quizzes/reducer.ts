import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../../Database";
console.log(questions);

const initialState = {
    questions: questions,
};

const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        addQuestion: (state, { payload: question }) => {
            const newQuestion = {
                _id: question._id,
                title: question.title,
                type: question.type,
                question: question.question,
                options: question.options,
                answer: question.answer,
                points: question.points,
            };
            state.questions = [...state.questions, newQuestion] as any;
        },

        deleteQuestion: (state, { payload: qsid }) => {
            state.questions = state.questions.filter((a) => a._id !== qsid);
        },

        editQuestion: (state, { payload: updatedQuestion }) => {
            state.questions = state.questions.map((a) =>
                a._id === updatedQuestion._id ? { ...a, ...updatedQuestion } : a
            );
        },
    },
});

export const { addQuestion, deleteQuestion, editQuestion } = questionSlice.actions;
export default questionSlice.reducer;

