import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from "./TrueFalseEditor";
import FillInBlanksEditor from './FillInBlanksEditor';
import { addQuestion, editQuestion, setQuestion } from './reducer';
import * as client from './client';
import { IoIosArrowDown } from "react-icons/io";
import { editQuiz } from "../QuizEntry/reducer";

const Edit = () => {
    const { cid, qid, questionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const questions = useSelector((state: any) => state.questionReducer ? state.questionReducer.questions : []);
    const [currQuestion, setCurrQuestion] = useState<any>({
        quizID: qid || "",
        title: "",
        type: "Multiple Choice", 
        question: "",
        choices: [],
        answers: {},
        points: 0
    });
    const [choices, setChoices] = useState<string[]>(['', '', '', '']);
    const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);

    useEffect(() => {
        if (questionId) {
            const question = questions.find((q: any) => q._id === questionId);
            if (question) {
                setCurrQuestion(question);
                setChoices(question.choices || ['', '', '', '']);
            }
        }
    }, [questionId, questions]);

    const handleChoicesChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newChoices = [...choices];
        newChoices[index] = event.target.value;
        setChoices(newChoices);
    };

    const handleCorrectAnswerChange = (choice: string) => {
        setCurrQuestion({ ...currQuestion, answers: { "1": choice } });
    };

    const handleAddChoice = () => {
        setChoices([...choices, '']);
    };

    const handleDeleteChoice = (index: number) => {
        const newChoices = choices.filter((_, i) => i !== index);
        setChoices(newChoices);
    };

    const handleQuestionSave = async () => {
        try {
            const questionData = { ...currQuestion, quizID: qid, choices };
            let savedQuestion;
            if (currQuestion._id) {
                savedQuestion = await client.updateQuizQuestion(qid, questionData);
                dispatch(editQuestion(savedQuestion));
            } else {
                savedQuestion = await client.addNeWQuizQuestion(qid, questionData);
                dispatch(addQuestion(savedQuestion));
            }
            const fetchedQuestions = await client.fetchQuizQuestions(qid);
            dispatch(setQuestion(fetchedQuestions));
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionList`);
        } catch (error) {
            console.error("Error saving question:", error);
            alert("There was an error saving the question. Please try again.");
        }
    };
    

    const handleQuestionCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionList`);
    };

    return (
        <div>
            <div className="d-flex align-items-center mb-3">
                <div className="mr-3 flex-fill">
                    <input
                        type="text"
                        id="questionTitle"
                        value={currQuestion.title}
                        className="form-control"
                        onChange={(e) => setCurrQuestion({ ...currQuestion, title: e.target.value })}
                        placeholder="Question Title"
                        required
                    />
                </div>
                <div className="mr-3 flex-fill ms-4">
                    <select
                        id="questionType"
                        className="form-control"
                        value={currQuestion.type}
                        onChange={(e) => setCurrQuestion({ ...currQuestion, type: e.target.value })}
                    >
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True/False">True/False</option>
                        <option value="Fill in the Blanks">Fill in the Blanks</option>
                    </select>
                    <IoIosArrowDown
                     className="position-absolute"
                    style={{ top: "12%", right: "300px", transform: "translateY(60%)" }}
                    />
                </div>
                <div className="flex-fill text-right ms-4">
                    <label htmlFor="pointsQ" style={{ fontSize: '16px' }}><b>pts:</b></label>
                    <input
                        type="number"
                        value={currQuestion.points}
                        className="form-control d-inline"
                        id="pointsQ"
                        style={{ width: '60px', display: 'inline-block' }}
                        placeholder="Points"
                        onChange={(e) => setCurrQuestion({ ...currQuestion, points: parseInt(e.target.value) })}
                        required
                    />
                </div>
            </div>

            {currQuestion.type === 'Multiple Choice' && (
                <MultipleChoiceEditor
                    currQuestion={currQuestion}
                    setCurrQuestion={setCurrQuestion}
                    choices={choices}
                    setChoices={setChoices}
                    handleChoicesChange={handleChoicesChange}
                    handleCorrectAnswerChange={handleCorrectAnswerChange}
                    handleAddChoice={handleAddChoice}
                    handleDeleteChoice={handleDeleteChoice}
                    selectedChoiceIndex={selectedChoiceIndex}
                    setSelectedChoiceIndex={setSelectedChoiceIndex}
                />
            )}

            {currQuestion.type === 'True/False' && (
                <TrueFalseEditor
                    currQuestion={currQuestion}
                    setCurrQuestion={setCurrQuestion}
                />
            )}

            {currQuestion.type === 'Fill in the Blanks' && (
                <FillInBlanksEditor
                    currQuestion={currQuestion}
                    setCurrQuestion={setCurrQuestion}
                />
            )}

            <br />
            <button className="btn btn-secondary" onClick={handleQuestionCancel}>Cancel</button>
            <button className="btn btn-danger" onClick={handleQuestionSave}>Update Question</button>
        </div>
    );
};

export default Edit;