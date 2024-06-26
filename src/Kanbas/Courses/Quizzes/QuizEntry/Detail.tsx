import { GiPencil } from "react-icons/gi";
import { Link, useLocation, useParams, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findQuizDetails } from "./client";
import { useEffect, useState } from "react";
import { setQuizDetails } from './reducer';
import * as acountClient from "../../../Account/client";
import { findRecordByUserByQuiz } from "../QuizPage/client";
import { Alert } from "react-bootstrap";

interface Quiz {
    _id: string;
    title: string;
    due_date: string;
    points: number;
    questions: Array<any>;
    how_many_attempts: number;
}

export default function Detail() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const { cid } = useParams();
    const qid = pathname.split("/")[5];
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertQuizID, setAlertQuizID] = useState<string>('');
    const [courseQuizzes, setCourseQuizzes] = useState<Quiz[]>([]);

    // Retrieving details for a quiz
    const fetchQuizDetails = async () => {
        try {
            const details = await findQuizDetails(cid as string, qid);
            dispatch(setQuizDetails(details));
        } catch (error) {
            console.error("Failed to fetch quiz details:", error);
        }
    };


    const userRole = currentUser?.role || "";

    // // Fetch user role
    // const [userRole, setUserRole] = useState<string>("");
    // const fetchUserRole = async () => {
    //     try {
    //         const currentUser = await acountClient.profile();
    //         setUserRole(currentUser.role);
    //     } catch (error) {
    //         console.error("Error fetching user role:", error);
    //     }
    // };

    useEffect(() => {
        fetchQuizDetails();
        // fetchUserRole();
    }, []);

    // find from redux
    const allQuizzes = useSelector((state: any) => state.quizzesReducer ? state.quizzesReducer.quizzes : []);
    const currQuiz = allQuizzes.find((quiz: any) => quiz.course === cid && quiz._id === qid);

    // format date
    const formattedDateTime = (date: any) => {
        return date ? date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }).replace(',', ' ')
            : '';
    }

    const checkUserAttempt = async (quiz: Quiz) => {
        try {
            const recordData = await findRecordByUserByQuiz(currentUser._id, quiz._id);
            console.log("recordData",recordData);
            console.log("quiz allowed attempt",quiz.how_many_attempts);
            console.log("record attempt",recordData.attempt)
            if (recordData && recordData.attempt >= quiz.how_many_attempts) {
                alert("You have reached the maximum quiz attempt. You will be directed to quiz answer page");
                setAlertQuizID(quiz._id);
               // setShowAlert(true);
               navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Answers/${currentUser._id}`);
                
            } else {
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/takequiz`);
            }
        } catch (error) {
            console.error('Failed to check user attempts', error);
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/takequiz`);
        }
    };

    return (
        <div id="detail-container">
            {userRole === "FACULTY" && (
                <div>
                    <div className="d-flex justify-content-center mb-3">
                        <div className="text-nowrap">
                            <Link id="quiz-preview" to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/takequiz`}>
                                <button id="preview-button" className="btn btn-lg btn-light border me-1" >
                                    Preview
                                </button>
                            </Link>
                            <Link id="quiz-edit" to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editdetail`}>
                                <button id="edit-button" className="btn btn-lg btn-light border me-1">
                                    <GiPencil className="position-relative me-1 mb-1" />
                                    Edit
                                </button>
                            </Link>
                        </div>
                    </div>
                    <hr />

                    <h1 id="quiz-title">{currQuiz?.title}</h1>
                    <div id="quiz-type" className="row mt-4">
                        <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                            Quiz Type
                        </div>
                        <div className="col-8">
                            {currQuiz?.quiz_type}
                        </div>
                    </div>
                    <div id="quiz-points" className="row">
                        <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                            Points
                        </div>
                        <div className="col-8">
                            {currQuiz?.points}
                        </div>
                    </div>
                    <div id="quiz-assignment-group" className="row">
                        <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                            Assignment Group
                        </div>
                        <div className="col-8">
                            {currQuiz?.assignment_group}
                        </div>
                    </div>
                    <div id="quiz-shuffle-answers" className="row">
                        <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                            Shuffle Answers
                        </div>
                        <div className="col-8">
                            {currQuiz?.shuffle_answers}
                        </div>
                    </div>
                    <div id="quiz-time-limit" className="row">
                        <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                            Time Limit
                        </div>
                        <div className="col-8">
                            {currQuiz?.time_limit}
                        </div>
                    </div>
                    <div id="quiz-multiple-attempts" className="row">
                        <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                            Multiple Attempts
                        </div>
                        <div className="col-8">
                            {currQuiz?.multiple_attempts}
                        </div>
                    </div>
                    {currQuiz?.multiple_attempts === "Yes" && (
                        <div id="quiz-how-many-attempts" className="row">
                            <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                                How Many Attempts
                            </div>
                            <div className="col-8">
                                {currQuiz?.how_many_attempts}
                            </div>
                        </div>
                    )}
                    <div id="quiz-show-correct-answers" className="row">
                        <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                            Show Correct Answers
                        </div>
                        <div className="col-8">
                            {currQuiz?.show_correct_answers}
                        </div>
                    </div>
                    <div id="quiz-access-code" className="row">
                        <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                            Access Code
                        </div>
                        <div className="col-8">
                            {currQuiz?.access_code}
                        </div>
                    </div>
                    <div id="quiz-one-question-at-a-time" className="row">
                        <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                            One Question at a Time
                        </div>
                        <div className="col-8">
                            {currQuiz?.one_question_at_a_time}
                        </div>
                    </div>
                    <div id="quiz-webcam-required" className="row">
                        <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                            Webcam Required
                        </div>
                        <div className="col-8">
                            {currQuiz?.webcam_required}
                        </div>
                    </div>
                    <div id="quiz-lock-questions-after-answering" className="row">
                        <div className="col-4" style={{ textAlign: "right", fontWeight: 'bold' }}>
                            Lock Questions After Answering
                        </div>
                        <div className="col-8">
                            {currQuiz?.lock_questions_after_answering}
                        </div>
                    </div>

                    <table id="quiz-schedule" className="table mt-4">
                        <thead>
                            <tr>
                                <th id="due-header" scope="col">Due</th>
                                <th id="available-from-header" scope="col">Available from</th>
                                <th id="until-header" scope="col">Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="due-date">{formattedDateTime(new Date(currQuiz?.due_date))}</td>
                                <td id="available-from">{formattedDateTime(new Date(currQuiz?.available_date))}</td>
                                <td id="until-date">{formattedDateTime(new Date(currQuiz?.until_date))}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            )}

            {userRole === "STUDENT" && (
                <div>
                    <h1 id="quiz-title">{currQuiz?.title}</h1>

                    <div className="d-flex justify-content-center mt-5 mb-5">
                        {/* <Link id="quiz-edit" to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editdetail`}> */}
                        {/* <Link id="quiz-preview" to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/takequiz`}> */}
                            <button id="edit-button" className="btn btn-lg btn-danger border me-1 mt-3"
                                onClick={() => checkUserAttempt(currQuiz)}>
                                Take the Quiz
                            </button>
                        {/* </Link> */}
                        {/* </Link> */}

                    </div>

                    {/* add: 
                    link here navigating to student quiz page */}

                    <table id="quiz-schedule" className="table mt-4">
                        <thead>
                            <tr>
                                <th id="due-header" scope="col">Due</th>
                                <th id="available-from-header" scope="col">Available from</th>
                                <th id="until-header" scope="col">Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="due-date">{formattedDateTime(new Date(currQuiz?.due_date))}</td>
                                <td id="available-from">{formattedDateTime(new Date(currQuiz?.available_date))}</td>
                                <td id="until-date">{formattedDateTime(new Date(currQuiz?.until_date))}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>)}
                {/* {showAlert && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Quiz Attempt Limit Reached</h5>
                                <button type="button" className="close" onClick={() => setShowAlert(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>You have reached the maximum number of attempts for this quiz.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log("within the showalert");
                                        setShowAlert(false);
                                        navigate(`/Kanbas/Courses/${cid}/Quizzes/${alertQuizID}/Answers/${currentUser._id}`);
                                    }}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    )
}
