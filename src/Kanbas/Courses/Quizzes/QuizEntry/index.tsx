import { FaCheckCircle, FaCircle, FaPlus } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { VscTriangleDown } from "react-icons/vsc";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { setQuizzes, deleteQuiz, editQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as client from "./client";
import * as acountClient from "../../../Account/client";
import { TbForbid } from "react-icons/tb";

export default function Quizzes() {
    const { pathname } = useLocation();
    const { cid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    // Retrieving Quizzes for Course
    const fetchQuizzes = async () => {
        const Quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(Quizzes));
    };
    useEffect(() => {
        fetchQuizzes();
        // fetchUserRole();
    }, []);

    // format some key details
    const currDate = new Date();
    const getQuizStatus = (availableDateString: any, untilDateString: any) => {
        const availableDate = new Date(availableDateString);
        const untilDate = new Date(untilDateString);
        if (currDate < availableDate) return { text: 'Not available until', date: availableDate };
        else if (currDate >= availableDate && currDate <= untilDate) return { text: 'Available until', date: untilDate };
        else return { text: 'Closed', date: null };
    }
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
    const renderQuizDetails = (quiz: any) => {
        const { text, date } = getQuizStatus(quiz.available_date, quiz.until_date);
        return (
            <>
                <b>{text}</b> {date && formattedDateTime(date)}
            </>
        )
    }

    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
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

    // handle click
    const handleEditClick = (quiz: any) => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`);
    };

    const handleDeleteClick = async (quiz: any) => {
        await client.deleteQuiz(quiz._id);
        dispatch(deleteQuiz(quiz._id));
        setShowModal(false);
    };

    const handlePublishClick = async (quiz: any) => {
        try {
            const updatedQuiz = { ...quiz, published: quiz.published === "Published" ? "Unpublished" : "Published" };
            await client.updateQuiz(updatedQuiz);
            dispatch(editQuiz(updatedQuiz));
        } catch (error) {
            console.error("Error publishing/unpublishing quiz:", error);
        }
    };


    return (
        <div id="quizzes-container">
            {userRole === "FACULTY" && (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="input-group" style={{ width: '200px' }}>
                            <span className="input-group-text" style={{ backgroundColor: 'transparent' }}>
                                <CiSearch />
                            </span>
                            <input id="wd-search-quiz"
                                className="form-control"
                                placeholder="Search for Quiz" />
                        </div>
                        <div className="text-nowrap">
                            <button id="options-button" className="btn btn-lg btn-light border me-1 float-end">
                                <BsThreeDotsVertical className="position-relative mb-1" />
                            </button>

                            <Link to={`/Kanbas/Courses/${cid}/Quizzes/newdetail`}>
                                <button id="new-quiz-button" className="btn btn-lg btn-danger me-1 float-end">
                                    <AiOutlinePlus className="position-relative me-1 mb-1" />
                                    Quiz
                                </button>
                            </Link>
                        </div>
                    </div>
                    <hr />

                    <ul id="wd-quizzes" className="list-group rounded-0">
                        <li className="list-group-item p-0 mb-5 fs-5" >
                            <div className="wd-title p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <VscTriangleDown className="me-2" />
                                    <b>Assignment Quizzes</b>
                                </div>
                            </div>

                            <ul className="wd-quiz list-group rounded-0">
                                {quizzes
                                    .filter((quiz: any) => quiz.course === cid)
                                    .map((quiz: any) => (
                                        <li className="wd-quiz-item list-group-item p-3 ps-1" style={{ borderLeft: '5px solid green' }}>
                                            <div className="d-flex align-self-center" >
                                                <div className="align-self-center" style={{ display: 'flex' }}>
                                                    <MdOutlineRocketLaunch className="me-2 ms-2" />
                                                </div>



                                                <div className="flex-grow-1" style={{ margin: '0 20px' }}>
                                                    <Link id="quiz-link" to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                                                        style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                                                        {quiz.title}
                                                    </Link>
                                                    <br />
                                                    <span id="quiz-details">
                                                        {renderQuizDetails(quiz)} | <b> Due </b> {formattedDateTime(new Date(quiz.due_date))} | {quiz.points} pts | {quiz.questions ? quiz.questions.length : 0} Questions
                                                    </span>
                                                </div>

                                                <div className="d-flex align-self-center" >
                                                    {quiz.published === "Unpublished" && (
                                                        <div id="quiz-status" className="me-3">
                                                            <TbForbid className="text-danger fs-5" />
                                                        </div>
                                                    )}
                                                    {quiz.published === "Published" && (
                                                        <div id="quiz-status" className="ms-3">
                                                            <FaCheckCircle className="text-success fs-5" />
                                                            <FaCircle className="text-white fs-6" />
                                                        </div>
                                                    )}


                                                    <button id="quiz-options" className="border-0 bg-transparent" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <IoEllipsisVertical className="fs-4" />
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <li><button className="dropdown-item" type="button" onClick={() => handleEditClick(quiz)}>Edit</button></li>
                                                        <li><button className="dropdown-item" type="button" onClick={() => setShowModal(true)}>Delete</button></li>
                                                        <li><button className="dropdown-item" type="button" onClick={() => handlePublishClick(quiz)}>
                                                            {quiz.published === "Unpublished" ? "Publish" : "Unpublish"}
                                                        </button></li>
                                                    </ul>
                                                </div>


                                                <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Delete Quiz</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        Are you sure you want to remove this quiz?
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                                                            No
                                                        </Button>
                                                        <Button variant="danger" onClick={() => handleDeleteClick(quiz)}>
                                                            Yes
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    </ul >
                </div>
            )}

            {userRole === "STUDENT" && (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="input-group" style={{ width: '200px' }}>
                            <span className="input-group-text" style={{ backgroundColor: 'transparent' }}>
                                <CiSearch />
                            </span>
                            <input id="wd-search-quiz"
                                className="form-control"
                                placeholder="Search for Quiz" />
                        </div>
                    </div>
                    <hr />

                    <ul id="wd-quizzes" className="list-group rounded-0">
                        <li className="list-group-item p-0 mb-5 fs-5" >
                            <div className="wd-title p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <VscTriangleDown className="me-2" />
                                    <b>Assignment Quizzes</b>
                                </div>
                            </div>

                            <ul className="wd-quiz list-group rounded-0">
                                {quizzes
                                    .filter((quiz: any) => quiz.course === cid && quiz.published === "Published")
                                    .map((quiz: any) => (
                                        <li className="wd-quiz-item list-group-item p-3 ps-1" style={{ borderLeft: '5px solid green' }}>
                                            <div className="d-flex align-self-center" >
                                                <div className="align-self-center" style={{ display: 'flex' }}>
                                                    <MdOutlineRocketLaunch className="me-2 ms-2" />
                                                </div>

                                                <div className="flex-grow-1" style={{ margin: '0 20px' }}>

                                                    <Link id="quiz-link" to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                                                        style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                                                        {quiz.title}
                                                    </Link>

                                                    {/* add:
                                                student attempt's score under the title
                                                */}

                                                    <br />
                                                    <span id="quiz-details">
                                                        {renderQuizDetails(quiz)} | <b> Due </b> {formattedDateTime(new Date(quiz.due_date))} | {quiz.points} pts | {quiz.questions ? quiz.questions.length : 0} Questions
                                                    </span>
                                                </div>

                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    </ul >
                </div>
            )}
        </div >
    );
}




