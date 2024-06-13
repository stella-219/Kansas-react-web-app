import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams, } from "react-router";
import Editor from 'react-simple-wysiwyg'
import { quizzes, questions } from "../../Database";
import { editQuestion} from "./reducer";

interface Question {
    _id: string;
    title: string;
    type: string;
    question: string;
    options: string[];
    answer: string;
    points: number;
}

interface State {
    questionReducer: {
        questions: Question[];
    };
}

export default function Edit() {
    const { pathname } = useLocation();
    const course = pathname.split("/")[3];
    const assignmentId = pathname.split("/")[5];
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quiz = quizzes.find((quiz) => quiz._id === qid);
    const questions = useSelector((state: any) => state.questionReducer ? state.questionReducer.questions : []);
    const quizQuestions = quiz ? questions.filter((question: any) => quiz.questions.includes(question._id)) : [];

    const [currQuestion, setCurrQuestion] = useState<any>(null);
    const [choices, setChoices] = useState<string[]>([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

    useEffect(() => {
        if (selectedQuestionId) {
            const selectedQuestion = quizQuestions.find((question: any) => question._id === selectedQuestionId);
            if (selectedQuestion) {
                setCurrQuestion(selectedQuestion);
                setChoices(selectedQuestion.options || ['', '', '', '']);
            }
        }
    }, [selectedQuestionId, quizQuestions]);

    const handleChoicesChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newChoices = [...choices];
        newChoices[index] = event.target.value;
        setChoices(newChoices);
    };

    const handleCorrectAnswerChange = (choice: string) => {
        setCurrQuestion({ ...currQuestion, answer: choice });
    };

    const handleQuestionCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/edit/${qid}`);
    };

    const handleQuestionSave = () => {
        const updatedQuestion = { ...currQuestion, options: choices };
        dispatch(editQuestion(updatedQuestion));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/edit/${qid}`);
    };

    const handleOnChangeSelectedType = (type: string) => {
        if (currQuestion) {
            setCurrQuestion({ ...currQuestion, type });
        }
    };

    return (
        <>
            <select id="questionSelector" className="form-control" onChange={(e) => setSelectedQuestionId(e.target.value)}>
                <option value="">Select a question</option>
                {quizQuestions.map((question: any) => (
                    <option key={question._id} value={question._id}>{question.title}</option>
                ))}
            </select>
            <br />

            {currQuestion && (
                <>
                    <select id="questionType" className="form-control" value={currQuestion.type} onChange={(e) => handleOnChangeSelectedType(e.target.value)}>
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True/False">True/False</option>
                        <option value="Fill in the Blanks">Fill in the Blanks</option>
                    </select>
                    <br />

                    {currQuestion.type === 'Multiple Choice' && (
                        <MultipleChoiceEditor
                            currQuestion={currQuestion}
                            setCurrQuestion={setCurrQuestion}
                            choices={choices}
                            handleChoicesChange={handleChoicesChange}
                            handleCorrectAnswerChange={handleCorrectAnswerChange}
                        />
                    )}

                    {currQuestion.type === 'True/False' && (
                        <TrueFalseEditor currQuestion={currQuestion} setCurrQuestion={setCurrQuestion} />
                    )}

                    {currQuestion.type === 'Fill in the Blanks' && (
                        <FillInBlanksEditor currQuestion={currQuestion} setCurrQuestion={setCurrQuestion} />
                    )}
                </>
            )}

            <br />
            <button className="btn btn-secondary" onClick={handleQuestionCancel}>Cancel</button>
            <button className="btn btn-danger" onClick={handleQuestionSave}>Save</button>
        </>
    );
}

interface MultipleChoiceEditorProps {
    currQuestion: any;
    setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
    choices: string[];
    handleChoicesChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCorrectAnswerChange: (choice: string) => void;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({ currQuestion, setCurrQuestion, choices, handleChoicesChange, handleCorrectAnswerChange }) => (
    <>
        <label htmlFor="questionTitle">Title</label>
        <input type="text" id="questionTitle" value={currQuestion.title} className="form-control" onChange={(e) => setCurrQuestion({ ...currQuestion, title: e.target.value })} required />
        <br />
        <label htmlFor="pointsQ">Points</label>
        <input type="number" value={currQuestion.points} className="form-control" id="pointsQ" placeholder="Enter Points" onChange={(e) => setCurrQuestion({ ...currQuestion, points: e.target.value })} required />
        <br />
        <b>Question:</b>
        <Editor id="questionDesc" value={currQuestion.question} onChange={(e) => setCurrQuestion({ ...currQuestion, question: e.target.value })} aria-required="true" />
        <br />
        <b>Choices:</b>
        <br />
        {choices.map((choice, index) => (
            <div key={index}>
                <input type="text" id={`option${index + 1}`} value={choice} className="form-control" onChange={(e) => handleChoicesChange(index, e)} />
                <input type="radio" id={`MC${index + 1}`} name="MC" checked={currQuestion.answer === choice} onChange={() => handleCorrectAnswerChange(choice)} />
                <label className="form-check-label" htmlFor={`MC${index + 1}`}>Is Correct</label>
                <br />
            </div>
        ))}
    </>
);

interface TrueFalseEditorProps {
    currQuestion: any;
    setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
}

const TrueFalseEditor: React.FC<TrueFalseEditorProps> = ({ currQuestion, setCurrQuestion }) => (
    <>
        <label htmlFor="questionTitle">Title</label>
        <input type="text" value={currQuestion.title} id="questionTitle" className="form-control" onChange={(e) => setCurrQuestion({ ...currQuestion, title: e.target.value })} required />
        <br />
        <label htmlFor="pointsQ">Points</label>
        <input type="number" value={currQuestion.points} className="form-control" id="pointsQ" placeholder="Enter Points" onChange={(e) => setCurrQuestion({ ...currQuestion, points: e.target.value })} required />
        <br />
        <b>Question:</b>
        <Editor id="questionDesc" value={currQuestion.question} onChange={(e) => setCurrQuestion({ ...currQuestion, question: e.target.value })} aria-required="true" />
        <br />
        <b>Choices:</b>
        <br />
        <input type="text" id="option1" className="form-control" value="True" disabled />
        <input type="radio" id="TF1" name="TF" checked={currQuestion.answer === "True"} onChange={() => setCurrQuestion({ ...currQuestion, answer: "True" })} />
        <label className="form-check-label" htmlFor="TF1">Is Correct</label>
        <br />
        <input type="text" id="option2" className="form-control" value="False" disabled />
        <input type="radio" id="TF2" name="TF" checked={currQuestion.answer === "False"} onChange={() => setCurrQuestion({ ...currQuestion, answer: "False" })} />
        <label className="form-check-label" htmlFor="TF2">Is Correct</label>
        <br />
    </>
);

interface FillInBlanksEditorProps {
    currQuestion: any;
    setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
}

const FillInBlanksEditor: React.FC<FillInBlanksEditorProps> = ({ currQuestion, setCurrQuestion }) => (
    <>
        <label htmlFor="questionTitle">Title</label>
        <input type="text" id="questionTitle" value={currQuestion.title} className="form-control" onChange={(e) => setCurrQuestion({ ...currQuestion, title: e.target.value })} required />
        <br />
        <label htmlFor="pointsQ">Points</label>
        <input type="number" value={currQuestion.points} className="form-control" id="pointsQ" placeholder="Enter Points" onChange={(e) => setCurrQuestion({ ...currQuestion, points: e.target.value })} required />
        <br />
        <b>Question:</b>
        <Editor id="questionDesc" value={currQuestion.question} onChange={(e) => setCurrQuestion({ ...currQuestion, question: e.target.value })} aria-required="true" />
        <br />
        <input type="text" value={currQuestion.answer} className="form-control" onChange={(e) => setCurrQuestion({ ...currQuestion, answer: e.target.value })} placeholder="Enter the correct answer" />
    </>
);