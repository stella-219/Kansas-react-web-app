
import { useState, useEffect } from "react";

export default function TrueFalse({ onSave }: { onSave: (question: any) => void }) {
    const [question, setQuestion] = useState({
        type: "True False",
        title: '',
        points: '',
        problem: '',
        answer: false
    });

    const handleCheckboxChange = () => {
        setQuestion({ ...question, answer: !question.answer });
    };
    const saveQuestion = () => {
        onSave(question);
    };

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Title:</td>
                        <td><input value={question.title} onChange={(e) => setQuestion({ ...question, title: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <td>Points:</td>
                        <td><input value={question.points} onChange={(e) => setQuestion({ ...question, points: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <td>Problem:</td>
                        <td><input value={question.problem} onChange={(e) => setQuestion({ ...question, problem: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <td>Answer: </td>
                        <td>
                            <input
                                type="checkbox"
                                checked={question.answer}
                                onChange={handleCheckboxChange}
                            />
                            <label>True(clicked)/False(unclicked)</label>
                        </td>
                        <td>
                            <button onClick={saveQuestion}>
                                Save
                            </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}