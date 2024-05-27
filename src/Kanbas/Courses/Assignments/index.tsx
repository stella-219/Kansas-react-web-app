import GreenCheckPlus from "./GreenCheckPlus";
import { BsGripVertical } from 'react-icons/bs';
import { GiNotebook } from "react-icons/gi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useParams } from "react-router";
import * as db from "../../Database";
import "./index.css";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter(assignment => assignment.course === cid);
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group w-50">
          <span className="input-group-text bg-white border-end-0">
            <HiMagnifyingGlass />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            id="wd-search-assignment"
            placeholder="Search..."
          />
        </div>
        <div className="d-flex">
          <button id="wd-add-assignment-group" className="btn btn-lg btn-outline-secondary me-1">
            + Group
          </button>
          <button id="wd-add-assignment" className="btn btn-lg btn-danger">
            + Assignment
          </button>
        </div>
      </div>
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="list-group-item p-1 mb-3 fs-5 border-grey">
          <div className="wd-title p-3 ps-2 bg-secondary text-black d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <AiFillCaretDown /> ASSIGNMENTS
            </div>
            <div className="d-flex align-items-center">
              <button type="button" className="btn btn-outline-secondary text-black me-1">40% of Total</button>
              <AiOutlinePlus className="me-2" />
              <BiDotsVerticalRounded />
            </div>
          </div>
          <ul className="list-group list-group-flush">
            {assignments.map(assignment => (
              <li key={assignment._id} className="wd-assignment-list-item list-group-item p-3 ps-1" style={{ borderLeft: '5px solid green' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <GiNotebook className="me-2 fs-3" style={{ color: 'green' }} />
                    <a className="wd-assignment-link" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                      {assignment.title}
                    </a>
                  </div>
                  <GreenCheckPlus />
                </div>
                <div className="d-flex align-items-center mt-2">
                  <BsGripVertical className="me-2 fs-3 invisible" />
                  <GiNotebook className="me-2 fs-3 invisible" />
                  <span id="wd-assignment-content" className="text-start flex-grow-1">
                  <span className="text-red">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <br />
                      <b>Due</b> May 13 at 11:59pm | 100 pts
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}