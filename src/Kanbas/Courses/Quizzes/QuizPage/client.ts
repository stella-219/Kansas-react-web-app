import axios from "axios";

type Answer = {
    questionId: string;
    answer: string | { [key: string]: string };
};

type QuizRecord = {
    user: string;
    role: string;
    course: string;
    quiz: string;
    attempt: number;
    startedAt: string;
    submittedAt: string;
    timeTaken: string;
    score: number;
    answers: Answer[];
};



const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const RECORDS_API = `${REMOTE_SERVER}/api/records`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

//QUIZZES_API
// fetch all quizzes for a course
export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
}


// fetch details of a quiz
export const findQuizDetails = async (cid: string, quizID: string) => {
    const response = await axios.get(`${COURSES_API}/${cid}/quizzes/${quizID}`);
    return response.data;
};

//fetch individual quiz by ID
export const findQuizById = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
}

//QUESTIONS_API
// fetch all questions for a quiz
export const findQuestionsByQuiz = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
        return response.data;
}

//fetch individual questions by ID
export const findQuestionById = async (questionId: string) => {
    const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
}

//RECORDS_API
// fetch all records for a quiz
export const findRecordByUserByQuiz = async (userId: string, quizID: string) => {
    const response = await axios.get(`${RECORDS_API}/${userId}/${quizID}`);
    return response.data;
}
// Create a record for a quiz
export const createRecordForUserForQuiz = async (record: QuizRecord) => {
    const response = await axios.post(`${RECORDS_API}/saveRecords`, record);
    return response.data;
};


// Update a record for a quiz
export const updateRecordForQuiz = async (userId: string, quizID: string, updatedRecord: any) => {
    const response = await axios.put(`${RECORDS_API}/${userId}/${quizID}`, updatedRecord);
    return response.data;
};