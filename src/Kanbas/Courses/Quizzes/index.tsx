import React from 'react';
import { BsGripVertical } from 'react-icons/bs';
import {Link } from 'react-router-dom';
import { AiFillCaretDown, AiOutlinePlus } from 'react-icons/ai';
import { useParams } from 'react-router';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { FaRocket } from 'react-icons/fa6';
import { IoIosCreate } from 'react-icons/io';
import { FaTrash} from 'react-icons/fa';
import { quizzes } from "../../Database";

export default function Quizzes() {
    const {cid,qid} = useParams();
    const courseQuizzes = quizzes.filter((quiz: any) => quiz.course === cid);

    return (
        <div>
            <div id="wd-quizzes" className="d-flex align-items-center justify-content-between mb-3">
                <div className="input-group w-50">
                    <span className="input-group-text bg-white border-end-0">
                        <HiOutlineMagnifyingGlass />
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0"
                        id="wd-search-quiz"
                        placeholder="Search for Quiz..."
                    />
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <button id="wd-add-quiz-btn" className="btn btn-md btn-danger mt-4 float-end">
                        + Quiz
                    </button>
                </div>
            </div> 

            <div id="wd-quizzes-list">
                <ul id="wd-quizzes-list" className="list-group rounded-0">
                    <li className="wd-quiz-list list-group-item p-0 mb-5 fs-5 border-gray" style={{ borderLeft: '5px solid green' }}>
                        <div className="wd-quiz-title p-3 ps-2 bg-secondary">
                            <AiFillCaretDown /> Assignment Quizzes
                        </div>
                        <ul className="wd-quiz-list-items list-group rounded-0">
                            {courseQuizzes.map(quiz => (
                                <li key = {quiz._id} className="wd-quiz-list-item list-group-item p-3 ps-1 d-flex align-items-center">
                                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} className="d-flex align-items-center flex-grow-1 text-decoration-none">
                                        <FaRocket className="ms-2 fs-3 text-success" />
                                        <div className="flex-grow-1 me-5">
                                            <div className="p-1 ps-3">
                                                <span className="wd-quiz-link">{quiz.title}</span>
                                                <p className="text-wrap fs-6 mt-1 text-dark">
                                                    <span className="wd-15 fw-bold">Closed  &nbsp; &nbsp;Due</span> &nbsp;
                                                    <span>{quiz.due_date} </span> &nbsp;&nbsp;
                                                    <span>{quiz.points} pts</span> &nbsp;&nbsp;
                                                    <span>{quiz.questions} Questions</span> 
                                                </p>
                                            </div>
                                        </div>
                                        <IoIosCreate className="fs-4 text-success ms-2" />
                                        <FaTrash className="fs-4 text-danger ms-2" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}