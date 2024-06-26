import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findRecordByUserByQuiz, findQuizDetails, findQuestionsByQuiz } from '../QuizPage/client';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

const formatDate = (date: string) => new Date(date).toLocaleString();

const QuizAnswer: React.FC = () => {
    const { cid, quizID, uid } = useParams<{ cid: string; quizID: string; uid: string }>();
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [record, setRecord] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [quizData, questionsData, recordData] = await Promise.all([
                    findQuizDetails(cid as string, quizID as string),
                    findQuestionsByQuiz(quizID as string),
                    findRecordByUserByQuiz(uid as string, quizID as string)
                ]);
                console.log(recordData);    //DEBUGGING
                setQuiz(quizData);
                setQuestions(questionsData);
                setRecord(recordData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, [cid, quizID, uid]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!record || !quiz) return <div>No data available.</div>;

    const totalPoints = questions.reduce((acc, question) => acc + question.points, 0);
    const studentScore = record.score;
    const timeTaken = record.timeTaken;
    const submittedAt = record.submittedAt;
    const keptScore = record.keptScore;

    // Extract the correct answer value for a given question
    const getCorrectAnswer = (question: any): string => {
        return Object.values(question.answers)[0] as string;
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-9 mb-3">
                    <h2>{quiz?.number}</h2>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div>
                            <span>
                                <strong>Due</strong> {formatDate(quiz?.due_date)} &nbsp;&nbsp;&nbsp;
                                <strong>Points</strong> {totalPoints} &nbsp;&nbsp;&nbsp;
                                <strong>Questions</strong> {questions.length} &nbsp;&nbsp;&nbsp;
                                <strong>Time Limit</strong> {quiz?.how_long} minutes
                            </span>
                            <br />
                            <span>
                                <strong>Available</strong> {formatDate(quiz?.available_date)}&nbsp;&nbsp;&nbsp;
                                <strong>Until</strong> {formatDate(quiz?.until_date)}
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className="mt-5">
                        <h4>Attempt History</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Attempt</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>LATEST</td>
                                    <td>{timeTaken}</td>
                                    <td>{studentScore} out of {totalPoints}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="ms-3">
                            <p>Score for this quiz: {studentScore} out of {totalPoints} <br />
                                Submitted {formatDate(submittedAt)}<br />
                                This attempt took {timeTaken}.
                            </p>
                        </div>
                    </div>
                    {questions.map((question, index) => {
                        const userAnswer = record.answers.find((ans: any) => ans.questionId === question._id);
                        const questionScore = userAnswer ? userAnswer.pointsEarned : 0;
                        const correctAnswer = getCorrectAnswer(question);

                        return (
                            <div key={index} className="position-relative mt-4">
                                <div className="card rounded-0">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">{question.title}</h5>
                                        <span>{questionScore} / {question.points} pts</span>
                                    </div>
                                    <div className="card-body">
                                        <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
                                        <div className="ms-3">
                                            {question.type === 'Multiple Choice' && question.choices && question.choices.map((option: any, idx: any) => (
                                                <div key={idx} className="form-check d-flex align-items-center">
                                                    <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                                        {userAnswer && userAnswer.answer === option && (
                                                            <>
                                                                {userAnswer.answer === correctAnswer ? (
                                                                    <FaCheckCircle className="text-success me-2" style={{ position: 'absolute', left: '-24px' }} />
                                                                ) : (
                                                                    <FaTimesCircle className="text-danger me-2" style={{ position: 'absolute', left: '-24px' }} />
                                                                )}
                                                            </>
                                                        )}
                                                        <input className="form-check-input ms-2 me-1" type="radio" name={`question-${question._id}`} disabled checked={userAnswer && userAnswer.answer === option} />
                                                        <label className="form-check-label">
                                                            {option}
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                            {question.type === 'True/False' && ['True', 'False'].map((option: any, idx: any) => (
                                                <div key={idx} className="form-check d-flex align-items-center">
                                                    <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                                        {userAnswer && userAnswer.answer === option && (
                                                            <>
                                                                {userAnswer.answer === correctAnswer ? (
                                                                    <FaCheckCircle className="text-success me-2" style={{ position: 'absolute', left: '-24px' }} />
                                                                ) : (
                                                                    <FaTimesCircle className="text-danger me-2" style={{ position: 'absolute', left: '-24px' }} />
                                                                )}
                                                            </>
                                                        )}
                                                        <input className="form-check-input ms-2 me-1" type="radio" name={`question-${question._id}`} disabled checked={userAnswer && userAnswer.answer === option} />
                                                        <label className="form-check-label">
                                                            {option}
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                            {question.type === 'Fill in the Blanks' && (
                                                <div>
                                                    {Object.keys(question.answers).map((key, idx) => (
                                                        <div key={idx} className="mb-3 d-flex align-items-center">
                                                            {userAnswer && (
                                                                <>
                                                                    <FaTimesCircle className={`me-2 ${userAnswer.answer[key] !== question.answers[key] ? 'text-danger' : 'd-none'}`} />
                                                                    <FaCheckCircle className={`me-2 ${userAnswer.answer[key] === question.answers[key] ? 'text-success' : 'd-none'}`} />
                                                                </>
                                                            )}
                                                            <label className="form-label me-1">{key}.</label>
                                                            <div className="d-flex align-items-center" style={{ width: '100%' }}>
                                                                <input type="text" className="form-control" disabled value={userAnswer ? userAnswer.answer[key] : ''} style={{ maxWidth: '300px' }} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {userAnswer && Object.keys(question.answers).some(key => userAnswer.answer[key] !== question.answers[key]) && (
                                                        <div>
                                                            <strong>Correct Answer:</strong>
                                                            {Object.keys(question.answers).map((key, idx) => (
                                                                userAnswer.answer[key] !== question.answers[key] && (
                                                                    <div key={idx} className="mb-3 d-flex align-items-center">
                                                                        <label className="form-label me-2">{key}.</label>
                                                                        <input type="text" className="form-control" disabled value={question.answers[key]} style={{ maxWidth: '300px' }} />
                                                                    </div>
                                                                )
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {userAnswer && userAnswer.answer !== correctAnswer && question.type !== 'Fill in the Blanks' && (
                                                <div className="mt-2">
                                                    <strong>Correct Answer:</strong>
                                                    <div className="form-check d-flex align-items-center">
                                                        <input className="form-check-input ms-2 me-2" type="radio" name={`question-${question._id}`} disabled />
                                                        <label className="form-check-label">
                                                            {correctAnswer}
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <br /><br />
                </div>
                <div className="col-lg-3 mt-2">
                    <div className="d-none d-md-block float-end">
                        <h4>Submission Details:</h4>
                        <hr />
                        <p><strong>Time:</strong> {timeTaken}</p>
                        <p><strong>Current Score: </strong> {studentScore} out of {totalPoints}</p>  
                        <p><strong>Kept Score:</strong> {keptScore} out of {totalPoints}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizAnswer;
