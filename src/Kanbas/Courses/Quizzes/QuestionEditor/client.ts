import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const fetchQuizQuestions = async (qid: any) => {
  try {
    const response = await axios.get(
      `${REMOTE_SERVER}/api/quizzes/${qid}/questions`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};

export const addNeWQuizQuestion = async (qid: any, question: any) => {
  try {
    const response = await axios.post(
      `${REMOTE_SERVER}/api/quizzes/${qid}/questions`,
      question
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new quiz question:", error);
    throw error;
  }
};

export const updateQuizQuestion = async (qid: any, question: any) => {
  try {
    const response = await axios.put(
      `${REMOTE_SERVER}/api/quizzes/${qid}/questions/${question._id}`,
      question
    );
    return response.data;
  } catch (error) {
    console.error("Error updating quiz question:", error);
    throw error;
  }
};

export const deleteQuizQuestionsByQuestionID = async (questionID: any) => {
 try {
  const response = await axios.delete(
    `${REMOTE_SERVER}/api/questions/${questionID}`
  );
  return response.data;
} catch (error) {
    console.error("Error deleting quiz question:", error);
    throw error;
}

};