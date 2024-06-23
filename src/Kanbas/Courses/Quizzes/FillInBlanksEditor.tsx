import React from 'react';
import Editor from 'react-simple-wysiwyg';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from "react-icons/gr";

interface FillInBlanksEditorProps {
  currQuestion: any;
  setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
}

const FillInBlanksEditor: React.FC<FillInBlanksEditorProps> = ({ currQuestion, setCurrQuestion }) => {
  const handleAnswerChange = (index: string, newValue: string) => {
    const newAnswers = { ...currQuestion.answers, [index]: newValue };
    setCurrQuestion({ ...currQuestion, answers: newAnswers });
  };

  const handleAddAnswer = () => {
    const newAnswers = { ...currQuestion.answers, [Object.keys(currQuestion.answers).length + 1]: '' };
    setCurrQuestion({ ...currQuestion, answers: newAnswers });
  };

  const handleDeleteAnswer = (index: string) => {
    const { [index]: _, ...newAnswers } = currQuestion.answers;
    setCurrQuestion({ ...currQuestion, answers: newAnswers });
  };

  return (
    <>
      <hr />
      <p style={{ fontSize: '0.9rem' }}>Enter your question text, then define all possible correct answers for the blank.<br />
        Students will see the question followed by a small text box to type their answer.
      </p>
      <b>Question:</b><br />
      <Editor
        id="questionDesc"
        value={currQuestion.question}
        onChange={(e) => setCurrQuestion({ ...currQuestion, question: e.target.value })}
        aria-required="true"
      />
      <br />
      <b>Answers:</b>
      <div className="form-group">
        {Object.keys(currQuestion.answers).map((key, idx) => (
          <div key={idx} className="mb-3 d-flex align-items-center">
            <label className="form-label me-2">{key}.</label>
            <input
              type="text"
              className="form-control flex-fill"
              value={currQuestion.answers[key]}
              onChange={(e) => handleAnswerChange(key, e.target.value)}
              style={{ maxWidth: '300px' }}
            />
            <button className="btn p-0" onClick={() => handleAnswerChange(key, currQuestion.answers[key])}>
              <GrEdit style={{ marginLeft: '4px' }} />
            </button>
            <button className="btn p-0 ms-2" onClick={() => handleDeleteAnswer(key)}>
              <RiDeleteBin6Line style={{ marginLeft: '-4px' }} />
            </button>
          </div>
        ))}
      </div>
      <button className="btn btn-link p-0 float-end text-danger" onClick={handleAddAnswer}>
        + Add Another Answer
      </button>
    </>
  );
};

export default FillInBlanksEditor;