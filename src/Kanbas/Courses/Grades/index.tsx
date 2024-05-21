import { TbFileImport } from "react-icons/tb";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoIosArrowDown, IoIosSettings } from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiFilter } from "react-icons/ci";
export default function Grades() {
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
              <th>
                A1 SETUP
                <br />
                Out of 100
              </th>
              <th>
                A2 HTML
                <br />
                Out of 100
              </th>
              <th>
                A3 CSS
                <br />
                Out of 100
              </th>
              <th>
                A4 BOOTSTRAP
                <br />
                Out of 100
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-danger">Jane Adams</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>92.18%</td>
              <td>66.22%</td>
            </tr>
            <tr>
              <td className="text-danger">Christina Allen</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-danger">Samreen Ansari</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-danger">Han Bao</td>
              <td>100%</td>
              <td>100%</td>
              <td>
                    <div className="input-group">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue="88.03%"
                         />
                        <span className="input-group-text">
                            <TbFileImport />
                        </span>
                    </div>
                </td>
              <td>98.99%</td>
            </tr>
            <tr>
              <td className="text-danger">Mahi Sai Srinivas Bobbili</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>98.37%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-danger">Siran Cao</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
