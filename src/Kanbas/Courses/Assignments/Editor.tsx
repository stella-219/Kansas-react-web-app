import { IoIosArrowDown } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; 
import { IoIosClose } from "react-icons/io";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <div className="mb-3 row">
                <label htmlFor="wd-name" className="col-sm-2 col-form-label">Assignment Name</label>
                <div className="col-sm-10">
                    <input id="wd-name" value="A1" className="form-control" />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="wd-description" className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                    <div id="wd-description" className="form-control" style={{ height: 'auto' }}>
                        The assignment is <span className="text-red">available online</span>.
                        <br />
                        Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
                        <ul>
                            <li>Your full name and section</li>
                            <li>Links to each of the lab assignments</li>
                            <li>Link to the Kanbas application</li>
                            <li>Links to all relevant source code repositories</li>
                        </ul>
                        The Kanbas application should include a link to navigate back to the landing page.
                    </div>
                </div>
            </div>
            
            <div className="mb-3 row">
                <label htmlFor="wd-points" className="col-sm-2 col-form-label">Points</label>
                <div className="col-sm-10">
                    <input id="wd-points" value={100} className="form-control" />
                </div>
            </div>
            
            <div className="mb-3 row">
                <label htmlFor="wd-group" className="col-sm-2 col-form-label">Assignment Group</label>
                <div className="col-sm-10 position-relative">
                    <select id="wd-group" className="form-control">
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                    </select>
                    <IoIosArrowDown className="position-absolute" style={{ top: '45%', right: '15px', transform: 'translateY(-50%)' }} />
                </div>
            </div>
            
            <div className="mb-3 row">
                <label htmlFor="wd-display-grade-as" className="col-sm-2 col-form-label">Display Grade as</label>
                <div className="col-sm-10 position-relative">
                    <select id="wd-display-grade-as" className="form-control">
                        <option value="Percentage">Percentage</option>
                    </select>
                    <IoIosArrowDown className="position-absolute" style={{ top: '45%', right: '15px', transform: 'translateY(-50%)' }} />
                </div>
            </div>
            
            <div className="mb-3 row">
                <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label">Submission Type</label>
                <div className="col-sm-10">
                    <div className="card p-3">
                        <select id="wd-submission-type" className="form-control mb-3">
                            <option value="Online">Online</option>
                        </select>
                        <label className="form-label">
                            <b>Online Entry Options</b>
                        </label>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="wd-text-entry"
                            />
                            <label htmlFor="wd-text-entry" className="form-check-label">
                                Text Entry
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="wd-website-url"
                                defaultChecked
                            />
                            <label htmlFor="wd-website-url" className="form-check-label">
                                Website URL
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="wd-media-recordings"
                            />
                            <label htmlFor="wd-media-recordings" className="form-check-label">
                                Media Recordings
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="wd-student-annotation"
                            />
                            <label htmlFor="wd-student-annotation" className="form-check-label">
                                Student Annotation
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="wd-file-upload"
                            />
                            <label htmlFor="wd-file-upload" className="form-check-label">
                                File Uploads
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mb-3 row">
                <label htmlFor="wd-assign-to" className="col-sm-2 col-form-label">Assign</label>
                <div className="col-sm-10">
                    <div className="card p-3">
                        <div className="mb-3">
                            <label htmlFor="wd-assign-to" className="form-label"><b>Assign to</b></label>
                            <input id="wd-assign-to" value="Everyone" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="wd-due-date" className="form-label"><b>Due</b></label>
                            <input type="datetime-local" id="wd-due-date" value="2024-05-13T23:59" className="form-control" />
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-6">
                                <label htmlFor="wd-available-from" className="form-label"><b>Available From</b></label>
                                <input type="datetime-local" id="wd-available-from" value="2024-05-06T00:00" className="form-control" />
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="wd-available-until" className="form-label"><b>Until</b></label>
                                <input type="datetime-local" id="wd-available-until" value="2024-05-20T00:00" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-secondary me-2">Cancel</button>
                <button className="btn btn-danger">Save</button>
            </div>
        </div>
    );
}
