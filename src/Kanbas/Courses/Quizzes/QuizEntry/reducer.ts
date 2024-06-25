import { createSlice } from "@reduxjs/toolkit";

interface Quiz {
    _id: string;
    number: string;
    title: string;
    instruction?: string;
    quiz_type: string;
    points?: number;
    assignment_group?: string;
    shuffle_answers?: string;
    time_limit?: string;
    how_long?: string;
    multiple_attempts?: string;
    show_correct_answers?: string;
    access_code?: string;
    one_question_at_a_time?: string;
    webcam_required?: string;
    lock_questions_after_answering?: string;
    due_date?: string;
    available_date?: string;
    until_date?: string;
    questions: any[];
    course?: string;
}

interface QuizState {
    quizzes: Quiz[];
}

const initialState: QuizState = {
    quizzes: [],
};

const calculatePointsForQuiz = (quizQuestions: any[]): number => {
    return quizQuestions.reduce((acc, question) => acc + question.points, 0);
};

const quizSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizDetails: (state, { payload: quiz }) => {
            const existingQuizIndex = state.quizzes.findIndex((q: any) => q._id === quiz._id);
            if (existingQuizIndex !== -1) {
                state.quizzes[existingQuizIndex] = quiz;
            } else {
                state.quizzes.push(quiz);
            }
        },

        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },

        addQuiz: (state, { payload: quiz }) => {
            const questions = quiz.questions || [];
            const points = calculatePointsForQuiz(questions);
            const newQuiz = { ...quiz, points };
            state.quizzes.push(newQuiz);
        },

        deleteQuiz: (state, { payload: qid }) => {
            state.quizzes = state.quizzes.filter((q: any) => q._id !== qid);
        },

        editQuiz: (state, { payload: updatedQuiz }) => {
            const questions = updatedQuiz.questions || [];
            const points = calculatePointsForQuiz(questions);
            const updatedQuizWithPoints = { ...updatedQuiz, points };
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === updatedQuiz._id ? updatedQuizWithPoints : q
            );
        },
    },
});

export const { addQuiz, deleteQuiz, editQuiz, setQuizzes, setQuizDetails } = quizSlice.actions;
export default quizSlice.reducer;





// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     quizzes: [],
// };
// const quizSlice = createSlice({
//     name: "quizzes",
//     initialState,
//     reducers: {
//         setQuizDetails: (state, { payload: quiz }) => {
//             const existingQuizIndex = state.quizzes.findIndex((q: any) => q._id === quiz._id);
//             if (existingQuizIndex !== -1) {
//                 (state.quizzes as any)[existingQuizIndex] = quiz;
//             } else {
//                 state.quizzes = [...state.quizzes, quiz] as any;
//             }
//         },

//         setQuizzes: (state, action) => {
//             state.quizzes = action.payload;
//         },

//         addQuiz: (state, { payload: quiz }) => {
//             const newQuiz: any = {
//                 _id: quiz._id,
//                 number: quiz.number,
//                 title: quiz.title,
//                 instruction: quiz.instruction,
//                 quiz_type: quiz.quiz_type,
//                 points: quiz.points,
//                 assignment_group: quiz.assignment_group,
//                 shuffle_answers: quiz.shuffle_answers,
//                 time_limit: quiz.time_limit,
//                 how_long: quiz.how_long,
//                 multiple_attempts: quiz.multiple_attempts,
//                 show_correct_answers: quiz.show_correct_answers,
//                 access_code: quiz.access_code,
//                 one_question_at_a_time: quiz.one_question_at_a_time,
//                 webcam_required: quiz.webcam_required,
//                 lock_questions_after_answering: quiz.lock_questions_after_answering,
//                 due_date: quiz.due_date,
//                 available_date: quiz.available_date,
//                 until_date: quiz.until_date,
//                 questions: quiz.questions,
//                 course: quiz.course,
//             }
//             state.quizzes = [...state.quizzes, newQuiz] as any;
//         },

//         deleteQuiz: (state, { payload: qid }) => {
//             state.quizzes = state.quizzes.filter((q: any) => q._id !== qid);
//         },

//         editQuiz: (state, { payload: updatedQuiz }) => {
//             state.quizzes = state.quizzes.map((q: any) =>
//                 q._id === updatedQuiz._id ? { ...updatedQuiz } : q) as any;
//         },
//     },
// });
// export const { addQuiz, deleteQuiz, editQuiz, setQuizzes, setQuizDetails } =
//     quizSlice.actions;
// export default quizSlice.reducer;