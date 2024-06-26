import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Editor from 'react-simple-wysiwyg';
import { GrEdit } from "react-icons/gr";
import { TbArrowBigRight } from "react-icons/tb";

interface MultipleChoiceEditorProps {
  currQuestion: any;
  setCurrQuestion: React.Dispatch<React.SetStateAction<any>>;
  choices: string[];
  setChoices: React.Dispatch<React.SetStateAction<string[]>>;
  handleChoicesChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCorrectAnswerChange: (choice: string) => void;
  handleAddChoice: () => void;
  handleDeleteChoice: (index: number) => void;
  selectedChoiceIndex: number | null;
  setSelectedChoiceIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({
  currQuestion, setCurrQuestion, choices, setChoices, handleChoicesChange, handleCorrectAnswerChange, handleAddChoice, handleDeleteChoice, selectedChoiceIndex, setSelectedChoiceIndex
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
        {currQuestion.answers["1"] === choice && (
          <TbArrowBigRight className="text-success me-2" style={{ fontSize: '34px' }} />
        )}
        <label
          className={`form-check-label mr-2 ${currQuestion.answers["1"] === choice ? 'text-success font-weight-bold' : ''}`}
          htmlFor={`MC${index + 1}`}
        >
         {currQuestion.answers["1"] === choice ? 'Correct Answer' : 'Possible Answer'}
      
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
          checked={currQuestion.answers["1"] === choice}
          onChange={() => handleCorrectAnswerChange(choice)}
          style={{ display: 'none' }}
        />
      
        {selectedChoiceIndex === index && (
          <div className="d-flex" >
            <button className="btn p-0">
              <GrEdit style={{ marginLeft: '4px' }} />
            </button>
            <button className="btn p-0 ms-2" onClick={() => handleDeleteChoice(index)}>
              <RiDeleteBin6Line style={{ marginLeft: '-4px' }} />
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

export default MultipleChoiceEditor;