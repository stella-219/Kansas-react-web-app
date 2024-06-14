import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Editor from 'react-simple-wysiwyg';
import { quizzes } from "../../Database";
import { editQuestion } from "./reducer";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import '../../styles.css';

export default function Edit() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quiz = quizzes.find((quiz) => quiz._id === qid);
    const questions = useSelector((state: any) => state.questionReducer ? state.questionReducer.questions : []);
    const quizQuestions = useMemo(() => {
        return quiz ? questions.filter((question: any) => quiz.questions.includes(question._id)) : [];
    }, [quiz, questions]);
    const [currQuestion, setCurrQuestion] = useState<any>(null);
    const [choices, setChoices] = useState<string[]>([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
    const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);

    useEffect(() => {
        if (selectedQuestionId) {
            const selectedQuestion = quizQuestions.find((question: any) => question._id === selectedQuestionId);
            if (selectedQuestion) {
                setCurrQuestion(selectedQuestion);
                setChoices(selectedQuestion.options || ['', '', '', '']);
            }
        }
    }, [selectedQuestionId, quizQuestions]);

    useEffect(() => {
        if (!selectedQuestionId && quizQuestions.length > 0) {
            setSelectedQuestionId(quizQuestions[0]._id);
        }
    }, [quizQuestions]);

    const handleChoicesChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newChoices = [...choices];
        newChoices[index] = event.target.value;
        setChoices(newChoices);
    };

    const handleCorrectAnswerChange = (choice: string) => {
        setCurrQuestion({ ...currQuestion, answer: choice });
    };

    const handleAddChoice = () => {
        setChoices([...choices, '']);
    };

    const handleDeleteChoice = (index: number) => {
        const newChoices = choices.filter((_, i) => i !== index);
        setChoices(newChoices);
    };

    const handleQuestionCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/edit/${qid}`);
    };

    const handleQuestionSave = () => {
        const updatedQuestion = { ...currQuestion, options: choices };
        console.log(updatedQuestion);
        dispatch(editQuestion(updatedQuestion));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/edit/${qid}`);
    };

    return (
        <div className="box">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <select
                    id="questionSelector"
                    className="form-control"
                    onChange={(e) => setSelectedQuestionId(e.target.value)}
                >
                    <option value="">Select a question</option>
                    {quizQuestions.map((question: any) => (
                        <option key={question._id} value={question._id}>
                            {question.title}
                        </option>
                    ))}
                </select>
            </div>

            {currQuestion && (
                <>
                    <div className="d-flex align-items-center mb-3">
                        <div className="mr-3 flex-fill">
                            <input
                                type="text"
                                id="questionTitle"
                                value={currQuestion.title}
                                className="form-control"
                                onChange={(e) => setCurrQuestion({ ...currQuestion, title: e.target.value })}
                                placeholder="Easy Question"
                                required
                            />
                        </div>
                        <div className="mr-3 flex-fill ms-4">
                            <select
                                id="questionType"
                                className="form-control"
                                value={currQuestion.type || "Multiple Choice"}
                                onChange={(e) => setCurrQuestion({ ...currQuestion, type: e.target.value })}
                            >
                                <option value="Multiple Choice">Multiple Choice</option>
                                <option value="True/False">True/False</option>
                                <option value="Fill in the Blanks">Fill in the Blanks</option>
                            </select>
                        </div>
                        <div className="flex-fill text-right ms-4">
                            <label htmlFor="pointsQ" style={{ fontSize: '16px' }}><b>pts:</b></label>
                            <input
                                type="number"
                                value={currQuestion.points}
                                className="form-control d-inline"
                                id="pointsQ"
                                style={{ width: '60px', display: 'inline-block' }}
                                placeholder="4"
                                onChange={(e) => setCurrQuestion({ ...currQuestion, points: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {currQuestion.type === 'Multiple Choice' && (
                        <MultipleChoiceEditor
                            currQuestion={currQuestion}
                            setCurrQuestion={setCurrQuestion}
                            choices={choices}
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
                </>
            )}
        </div>
    );
}

interface MultipleChoiceEditorProps {
    currQuestion: any;
    setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
    choices: string[];
    handleChoicesChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCorrectAnswerChange: (choice: string) => void;
    handleAddChoice: () => void;
    handleDeleteChoice: (index: number) => void;
    selectedChoiceIndex: number | null;
    setSelectedChoiceIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({
    currQuestion, setCurrQuestion, choices, handleChoicesChange, handleCorrectAnswerChange, handleAddChoice, handleDeleteChoice, selectedChoiceIndex, setSelectedChoiceIndex
}) => (
    <>
        <hr /><p style={{ fontSize: '0.9rem' }}>Enter your question and multiple answers, then select the one correct answer.</p>
        <label htmlFor="questionDesc"><b>Question:</b></label>
        <Editor
            id="questionDesc"
            value={currQuestion.question}
            onChange={(e) => setCurrQuestion({ ...currQuestion, question: e.target.value })}
            aria-required="true"
        />
        <br />
        <b>Answers:</b>
        <br />
        {choices.map((choice, index) => (
            <div className="choice d-flex align-items-center mb-2" key={index} onClick={() => setSelectedChoiceIndex(index)} style={{ cursor: 'pointer' }}>
                <label
                    className={`form-check-label mr-2 ${currQuestion.answer === choice ? 'text-success font-weight-bold' : ''}`}
                    htmlFor={`MC${index + 1}`}
                >
                    {currQuestion.answer === choice ? 'Correct Answer' : 'Possible Answer'}
                </label>
                <input
                    type="text"
                    id={`option${index + 1}`}
                    value={choice}
                    className="form-control flex-fill"
                    onChange={(e) => handleChoicesChange(index, e)}
                />
                <input
                    type="radio"
                    id={`MC${index + 1}`}
                    name="MC"
                    checked={currQuestion.answer === choice}
                    onChange={() => handleCorrectAnswerChange(choice)}
                    style={{ display: 'none' }}
                />
                {selectedChoiceIndex === index && (
                    <div className="d-flex" >
                        <button className="btn p-0">
                            <GrEdit style={{marginLeft: '4px'}} />
                        </button>
                        <button className="btn p-0 ms-2" onClick={() => handleDeleteChoice(index)}>
                            <RiDeleteBin6Line style={{marginLeft: '-16px'}}/>
                        </button>
                    </div>
                )}
            </div>
        ))}
        <button className="btn btn-link p-0 float-end text-danger" onClick={handleAddChoice}>
            + Add Another Answer
        </button>
    </>
);

interface TrueFalseEditorProps {
    currQuestion: any;
    setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
}

const TrueFalseEditor: React.FC<TrueFalseEditorProps> = ({ currQuestion, setCurrQuestion }) => (
    <>
        <hr /><p style={{ fontSize: '0.9rem' }}>Enter your question text, then select if True or False is the correct answer.</p>
        <b>Question:</b>
        <Editor
            id="questionDesc"
            value={currQuestion.question}
            onChange={(e) => setCurrQuestion({ ...currQuestion, question: e.target.value })}
            aria-required="true"
        /><br />
        <b>Answers:</b>
        <br />
        <div className={`form-check ${currQuestion.answer === "True" ? "text-success font-weight-bold" : ""}`}>
            <input
                type="radio"
                id="TF1"
                name="TF"
                className="form-check-input"
                checked={currQuestion.answer === "True"}
                onChange={() => setCurrQuestion({ ...currQuestion, answer: "True" })}
                style={{ display: 'none' }}
            />
            <label className="form-check-label" htmlFor="TF1">
                True
            </label>
        </div>
        <div className={`form-check ${currQuestion.answer === "False" ? "text-success font-weight-bold" : ""}`}>
            <input
                type="radio"
                id="TF2"
                name="TF"
                className="form-check-input"
                checked={currQuestion.answer === "False"}
                onChange={() => setCurrQuestion({ ...currQuestion, answer: "False" })}
                style={{ display: 'none' }}
            />
            <label className="form-check-label" htmlFor="TF2">
                False
            </label>
        </div>
    </>
);

interface FillInBlanksEditorProps {
    currQuestion: any;
    setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
}

const FillInBlanksEditor: React.FC<FillInBlanksEditorProps> = ({ currQuestion, setCurrQuestion }) => (
    <>
        <hr/><p style={{ fontSize: '0.9rem' }}>Enter your question text, then define all possible correct ansers for the blank.<br/>
                Students will see the question followed by a small text box to type their answer.</p>
        
        <b>Question:</b><br/>
        <Editor
            id="questionDesc"
            value={currQuestion.question}
            onChange={(e) => setCurrQuestion({ ...currQuestion, question: e.target.value })}
            aria-required="true"
        />
        <br />
        <input
            type="text"
            value={currQuestion.answer}
            className="form-control"
            onChange={(e) => setCurrQuestion({ ...currQuestion, answer: e.target.value })}
            placeholder="Enter the correct answer"
        />
        <button className="btn btn-link p-0 float-end text-danger" >
            + Add Another Answer
        </button>
    </>
);
