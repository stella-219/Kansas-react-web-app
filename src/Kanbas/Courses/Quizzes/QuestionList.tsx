import { questions } from "../../Database";
import { useState, useEffect } from "react";
import MultipleChoice from "./MultipleChoice";
import TrueFalse from "./TrueFalse";
import MultipleBlanks from "./FillinBlanks";

export default function QuestionList() {
    
    const [question, setQuestion] = useState({
        type: "Multiple Choice",
        title: '',
        points: '',
        problem: '',
        choices: [] as string[],
        answer: '',
        answers: [] as string[]
    });
    const [questions, setQuestions] = useState<any>([]);
    const [isAddQuizOpen, setAddQuizOpen] = useState(false);

    const handleSaveQuestion = async(newQuestion: any) => {
        
    };

    const renderQuestionType = () => {
        switch (question.type) {
            case 'Multiple Choice':
                return <MultipleChoice onSave={handleSaveQuestion} />;
            case 'True False':
                return <TrueFalse onSave={handleSaveQuestion} />;
            case 'Fill in Multiple Blanks':
                return <MultipleBlanks onSave={handleSaveQuestion} />;
            default:
                return null;
        }
    };
    useEffect(() => {
      
    }, []);

    return (
        <>
            <div><h2>QUIZ
            </h2></div>
              
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Points</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Choices</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question: any) => (
                        <tr key={question._id}>
                            <td>{question.title}</td>
                            <td>{question.points}</td>
                            <td>{question.problem}</td>
                            <td>{question.answer}
                                <ul>
                                    {question.answers.map((answer: string, index: number) => (
                                        <li key={index}>{answer}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    {question.choices.map((choice: string, index: number) => (
                                        <li key={index}>{choice}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button>
                New Question
            </button>
            {isAddQuizOpen && (
                <div>
                    <div>
                        <select value={question.type} onChange={(e) =>
                            setQuestion({ ...question, type: e.target.value })}>
                            <option value="Multiple Choice">Multiple Choice</option>
                            <option value="True False">True False</option>
                            <option value="Fill in Multiple Blanks">Fill in Multiple Blanks</option>
                        </select>
                    </div>
                    {renderQuestionType()}
                    <div>
                        <button >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    )
};