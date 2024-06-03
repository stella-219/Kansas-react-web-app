import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md-4"> {/* Adjust column width as needed */}
          <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <button className="btn btn-success mb-3" onClick={addElement}>Add Element</button>
            <ul className="list-group">
              {array.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{item}</span>
                  <button className="btn btn-danger" onClick={() => deleteElement(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <hr/>
          </div>
        </div>
      </div>
    </div>
  );
}
