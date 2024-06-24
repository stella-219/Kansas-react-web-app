import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;

// fetch all quizzes for a course
export const findQuizzesForCourse = async (cid: string) => {
    const response = await axios
        .get(`${COURSES_API}/${cid}/quizzes`);
    return response.data;
};

// fetch details of a quiz
export const findQuizDetails = async (cid: string, qid: string) => {
    const response = await axios
        .get(`${COURSES_API}/${cid}/quizzes/${qid}`);
    return response.data;
};

// Creating a quiz for a Course
export const createQuiz = async (cid: string, quiz: any) => {
    const response = await axios.post(`${COURSES_API}/${cid}/quizzes`, quiz);
    return response.data;
};


// Update a quiz
export const updateQuiz = async (quiz: any) => {
    const response = await axios.put(`${QUIZ_API}/${quiz._id}`, quiz);
    return response.data;
};

// Deleting a quiz
export const deleteQuiz = async (qid: string) => {
    const response = await axios.delete(`${QUIZ_API}/${qid}`);
    return response.data;
};