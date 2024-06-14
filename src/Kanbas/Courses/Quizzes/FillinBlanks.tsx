import React, { useState } from 'react';

export default function MultipleBlanks({ onSave }: { onSave: (question: any) => void }) {
    const [question, setQuestion] = useState({
        type: "Fill in Multiple Blanks",
        title: '',
        points: '',
        problem: '',
        answers: [] as string[]
    });

    const addBlank = () => {
        setQuestion({ ...question, answers: [...question.answers, ''] });
    };
    const handleBlankChange = (index: number, value: string) => {
        const newAnswers = [...question.answers];
        newAnswers[index] = value;
        setQuestion({ ...question, answers: newAnswers });
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
                        <td>Blanks:</td>
                        {question.answers.map((answer, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => handleBlankChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                        <button onClick={addBlank}>Add Blank</button>
                        <td>
                            <button onClick={saveQuestion}>
                                Save
                            </button></td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
}