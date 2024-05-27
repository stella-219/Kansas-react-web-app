import { TbFileImport } from "react-icons/tb";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoIosArrowDown, IoIosSettings } from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiFilter } from "react-icons/ci";
import * as db from "../../Database";
import { useParams } from "react-router";
export default function Grades() {
  const { cid } = useParams();
  const currentEnrollments = db.enrollments.filter(enrollment => enrollment.course === cid);
  const studentIds = currentEnrollments.map(enrollment => enrollment.user);
  const students = db.users.filter(user => studentIds.includes(user._id));
  const courseAssignments = db.assignments.filter(assignment => assignment.course === cid);
  return (
    <div>
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-lg btn-light ms-2">
          <TbFileImport className="me-2 fs-5" />
          Import
        </button>
        <button className="btn btn-lg btn-light ms-2">
          <LiaFileImportSolid className="me-2 fs-5" />
          Import
        </button>
        <button className="btn btn-lg btn-light ms-2">
          <IoIosSettings className="me-2 fs-5" />
        </button>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="form-group">
            <label htmlFor="wd-search-grade" className="form-label">
              Student Name
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <HiMagnifyingGlass />
              </span>
              <input
                type="search"
                className="form-control border-start-0"
                id="wd-search-grade"
                placeholder="Search Student"
              />
              <IoIosArrowDown
                className="position-absolute"
                style={{ top: "50%", right: "20px", transform: "translateY(-50%)" }}
                 />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="wd-search-assignment" className="form-label">
              Assignment Names
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <HiMagnifyingGlass />
              </span>
              <input
                type="search"
                className="form-control border-start-0"
                id="wd-search-assignment"
                placeholder="Search Assignments"
              />
              <IoIosArrowDown
                className="position-absolute"
                style={{ top: "50%", right: "20px", transform: "translateY(-50%)" }}
                 />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div>
        <button className="btn btn-light btn-lg ms-2">
          <CiFilter className="me-2 fs-6" />
          Apply Filters
        </button>
      </div>
      <br />
      <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="table-light">
            <th>Student Name</th>
            {courseAssignments.map(assignment => (
              <th key={assignment._id}>
                {assignment.title}
                <br />
                Out of 100
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="text-danger">{student.firstName} {student.lastName}</td>
              {courseAssignments.map(assignment => {
                const grade = db.grades.find(g => g.student === student._id && g.assignment === assignment._id);
                return (
                  <td key={assignment._id}>
                    {grade ? `${grade.grade}` : 'N/A'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}