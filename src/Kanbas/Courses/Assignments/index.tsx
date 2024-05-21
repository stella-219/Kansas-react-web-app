import GreenCheckPlus from "./GreenCheckPlus";
import { BsGripVertical } from 'react-icons/bs';
import { GiNotebook } from "react-icons/gi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import "./index.css";

export default function Assignments() {
  return (
    <div>
      <div id="wd-assignments" className="d-flex align-items-center justify-content-between mb-3">
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
          <div className="wd-title p-3 ps-2 bg-secondary text-black">
            <BsGripVertical className="me-2 fs-3" />
            <AiFillCaretDown /> ASSIGNMENT
            <BiDotsVerticalRounded className="float-end mt-2" />
            <AiOutlinePlus className="float-end mt-2" />
            <button type="button" className="btn btn-outline-secondary text-black float-end me-1">40% of Total</button>
          </div>
          <ul className="list-group list-group-flush">
            <li className="wd-assignment-list-item list-group-item p-3 ps-1" style={{ borderLeft: '5px solid green' }}>
              <BsGripVertical className="me-2 fs-3" />
              <GiNotebook className="me-2 fs-3" />
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/123" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                A1
              </a>
              <GreenCheckPlus />
              <br />
              <span id="wd-assignment-content" className="ms-auto text-end">
                <span className="text-red">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <br />
                <b>Due</b> May 13 at 11:59pm | 100 pts
              </span>
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-1" style={{ borderLeft: '5px solid green' }}>
              <BsGripVertical className="me-2 fs-3" />
              <GiNotebook className="me-2 fs-3" />
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/124" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                A2
              </a>
              <GreenCheckPlus />
              <br />
              <span id="wd-assignment-content">
                <span className="text-red">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am | <br />
                <b>Due</b> May 20 at 11:59pm | 100 pts
              </span>
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-1" style={{ borderLeft: '5px solid green' }}>
              <BsGripVertical className="me-2 fs-3" />
              <GiNotebook className="me-2 fs-3" />
              <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/125" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                A3
              </a>
              <GreenCheckPlus />
              <br />
              <span id="wd-assignment-content">
                <span className="text-red">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am | <br />
                <b>Due</b> May 27 at 11:59pm | 100 pts
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
