import { useState } from 'react';

export default function MultipleChoice({ onSave }: { onSave: (question: any) => void }) {
    const [question, setQuestion] = useState({
        type: "Multiple Choice",
        title: '',
        points: '',
        problem: '',
        choices: [] as string[],
        answer: '',
    });
    const updateChoices = (index: number, value: string) => {
        const newChoices = [...question.choices];
        newChoices[index] = value;
        setQuestion({ ...question, choices: newChoices });
    };

    const handleRadioChange = (choice: string) => {
        setQuestion({ ...question, answer: choice });
    };

    const addChoice = () => {
        setQuestion({ ...question, choices: ["", ...question.choices] });
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
                        <td>Choices: </td>
                        <td>
                            {question.choices.map((choice, index) => (
                                <div key={index}>
                                    <textarea value={choice} onChange={(e) => updateChoices(index, e.target.value)} />
                                    <input
                                        type="radio"
                                        name="answer"
                                        checked={question.answer === choice}
                                        onChange={() => handleRadioChange(choice)}
                                    />
                                    {choice}
                                </div>
                            ))}
                            <button onClick={addChoice}>
                                addChoice
                            </button>
                        </td>
                        <td>
                            <button onClick={saveQuestion}>
                                Save
                            </button></td>
                    </tr>
                </tbody>
            </table>
        </div >);
}