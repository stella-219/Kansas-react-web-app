import React, { useState } from "react";

export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (indexToRemove: number) => {
        setArray(array.filter((item, currIndex) => currIndex !== indexToRemove));
    };
    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <button onClick={addElement} className="btn btn-success mb-2">
                Add Element
            </button>

            <div className="table-responsive">
                <table className="border">
                    <tbody>
                        {array.map((item, index) => (
                            <tr key={index} className="border">
                                <td>{item}
                                    <button onClick={() => deleteElement(index)}
                                        id="wd-delete-element-click"
                                        className="btn btn-danger ms-5 mb-1 mt-1 me-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr />
        </div>
    );
}
