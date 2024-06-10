import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useParams, useLocation } from "react-router";
import { Link, useNavigate } from 'react-router-dom';
import * as client from "./client";
import { useDispatch, useSelector } from "react-redux";
import React, { FormEvent, useState, useEffect } from "react";
import { addAssignment, editAssignment } from "./reducer";

export default function AssignmentEditor() {
    const { pathname } = useLocation();
    const course = pathname.split("/")[3];
    const assignmentId = pathname.split("/")[5];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allAssignments = useSelector((state: any) => state.assignmentsReducer.assignments);
    const currentAssignment = allAssignments.find((assignment: any) => assignment._id === assignmentId);
    const currentDate = new Date();
    const defaultTitle = currentAssignment ? currentAssignment.title : "";
    const defaultPoints = currentAssignment ? currentAssignment.points : "100";
    const defaultGroup = currentAssignment ? currentAssignment.assignmentGroup : "ASSIGNMENTS";
    const defaultDisplayGradeAs = currentAssignment ? currentAssignment.displayGradeAs : "Percentage";
    const defaultSubmissionType = currentAssignment ? currentAssignment.submissionType : "Online";
    const defaultDueDate = currentAssignment && currentAssignment.due ? currentAssignment.due : currentDate.toISOString().slice(0, 16);
    const defaultAvailableFrom = currentAssignment && currentAssignment.from ? currentAssignment.from : currentDate.toISOString().slice(0, 10) + "T00:00";
    const defaultAvailableUntil = currentAssignment && currentAssignment.until ? currentAssignment.until : currentDate.toISOString().slice(0, 10) + "T00:00";
    const defaultDescription = currentAssignment ? currentAssignment.description :
        `<p>The assignment is <span className="text-danger">available online</span>. </p>
         <p>Submit a link to the landing page of your Web application running on Netlify. </p>
         <p>The landing page should include the following:
             <ul>
                 <li>Your full name and section</li>
                 <li>Links to each of the lab assignments</li>
                 <li>Link to the Kanbas application</li>
                 <li>Links to all relevant source code repositories</li>
             </ul>
         </p>
         <p>The Kanbas application should include a link to navigate back to the landing page.</p>`;

    const [title, setTitle] = useState(defaultTitle);
    const [points, setPoints] = useState(defaultPoints);
    const [assignmentGroup, setAssignmentGroup] = useState(defaultGroup);
    const [displayGradeAs, setDisplayGradeAs] = useState(defaultDisplayGradeAs);
    const [submissionType, setSubmissionType] = useState(defaultSubmissionType);
    const [due, setDue] = useState(defaultDueDate);
    const [from, setFrom] = useState(defaultAvailableFrom);
    const [until, setUntil] = useState(defaultAvailableUntil);
    const [description, setDescription] = useState(defaultDescription);

    useEffect(() => {
        if (currentAssignment) {
            setTitle(currentAssignment.title);
            setPoints(currentAssignment.points);
            setAssignmentGroup(currentAssignment.assignmentGroup);
            setDisplayGradeAs(currentAssignment.displayGradeAs);
            setSubmissionType(currentAssignment.submissionType);
            setDue(currentAssignment.due);
            setFrom(currentAssignment.from);
            setUntil(currentAssignment.until);
            setDescription(currentAssignment.description);
        }
    }, [currentAssignment]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newAssignment = {
            _id: assignmentId === "new" ? new Date().getTime().toString() : assignmentId,
            title,
            course: course,
            points,
            assignmentGroup,
            displayGradeAs,
            submissionType,
            due,
            from,
            until,
            description,
        };
        if (currentAssignment) {
            // new API
            await client.updateAssignment(newAssignment);
            dispatch(editAssignment(newAssignment));
        } else {
            // new API
            await client.createAssignment(course, newAssignment);
            dispatch(addAssignment(newAssignment));
        }

        navigate(`/Kanbas/Courses/${course}/Assignments`);
    };

    const handleDescriptionChange = (e: any) => {
        setDescription(e.target.innerHTML);
    };

    return (
        <div id="wd-assignments-editor" className="p-4">
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="wd-name" className="form-label"><b>Assignment Name</b></label>
                    <input id="wd-name" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <div
                        id="wd-description"
                        className="form-control"
                        contentEditable={true}
                        style={{ minHeight: '100px', padding: '15px' }}
                        onInput={handleDescriptionChange}
                        dangerouslySetInnerHTML={{ __html: description }}>
                    </div>
                </div>
            </div>


            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-end">
                        <div className="col-md-11">

                            <div className="form-group row mb-3">
                                <label htmlFor="wd-points" className="col-sm-3 col-form-label" style={{ textAlign: 'right' }}>Points</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="wd-points" value={points} onChange={(e) => setPoints(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row mb-3 justify-content-end">
                                <label htmlFor="wd-group" className="col-sm-3 col-form-label" style={{ textAlign: 'right' }}>Assignment Group</label>
                                <div className="col-sm-9 position-relative">
                                    <select className="form-select" id="wd-group" value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)}>
                                        <option value="ASSIGNMENTS" selected={defaultGroup === "ASSIGNMENTS"}>ASSIGNMENTS</option>
                                        <option value="EXAMS" selected={defaultGroup === "EXAMS"}>EXAMS</option>
                                        <option value="QUIZZES" selected={defaultGroup === "QUIZZES"}>QUIZZES</option>
                                        <option value="LABS" selected={defaultGroup === "LABS"}>LABS</option>
                                        <option value="PROJECTS" selected={defaultGroup === "PROJECTS"}>PROJECTS</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label" style={{ textAlign: 'right' }}>Display Grade as</label>
                                <div className="col-sm-9 position-relative">
                                    <select className="form-select" id="wd-display-grade-as" value={displayGradeAs} onChange={(e) => setDisplayGradeAs(e.target.value)}>
                                        <option value="Percentage" selected={defaultDisplayGradeAs === "Percentage"} >
                                            Percentage
                                        </option>
                                        <option value="Points" selected={defaultDisplayGradeAs === "Points"}>
                                            Points
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="wd-submission-type" className="col-sm-3 col-form-label" style={{ textAlign: 'right' }}>Submission Type</label>
                                <div className="col-sm-9">
                                    <div className="border rounded p-3 mb-3">
                                        <div className="form-group mb-2 position-relative">
                                            <select className="form-select" id="wd-submission-type" value={submissionType} onChange={(e) => setSubmissionType(e.target.value)}>
                                                <option value="Online" selected={defaultSubmissionType === "Online"}>Online</option>
                                                <option value="No Submission" selected={defaultSubmissionType === "No Submission"}>No Submission</option>
                                                <option value="On Paper" selected={defaultSubmissionType === "On Paper"}>On Paper</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label style={{ fontWeight: 'bold' }}>Online Entry Options</label>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="wd-text-entry" />
                                                <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="wd-website-url" />
                                                <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
                                                <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
                                                <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="wd-file-upload" />
                                                <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="wd-assign-to" className="col-sm-3 col-form-label" style={{ textAlign: 'right' }}>Assign</label>
                                <div className="col-sm-9">
                                    <div className="border rounded p-3 mb-3">
                                        <div className="form-group mb-2">
                                            <label htmlFor="wd-assign-to" style={{ fontWeight: 'bold' }}>Assign to</label>
                                            <div className="input-group">
                                                <span className="form-control" id="wd-assign-to">Everyone <RxCross2 /></span>
                                            </div>
                                        </div>

                                        <div className="form-group mb-2">
                                            <label htmlFor="wd-due-date" style={{ fontWeight: 'bold' }}>Due</label>
                                            <input type="datetime-local" className="form-control" id="wd-due-date" value={due} onChange={(e) => setDue(e.target.value)} />
                                        </div>

                                        <div className="form-group row mb-2">
                                            <div className="col-sm-6 d-flex flex-column justify-content-center">
                                                <label htmlFor="wd-available-from" className="col-sm-6 col-form-label" style={{ fontWeight: 'bold' }}>Available from</label>
                                                <input type="datetime-local" className="form-control" id="wd-available-from" value={from} onChange={(e) => setFrom(e.target.value)} />
                                            </div>
                                            <div className="col-sm-6 d-flex flex-column justify-content-center">
                                                <label htmlFor="wd-available-until" className="col-sm-6 col-form-label" style={{ fontWeight: 'bold' }}>Until</label>
                                                <input type="datetime-local" className="form-control" id="wd-available-until" value={until} onChange={(e) => setUntil(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-end">
                        <Link to={`/Kanbas/Courses/${course}/Assignments`}>
                            <button type="button" className="btn btn-light border mr-2 board">
                                Cancel
                            </button>
                        </Link>

                        <button type="submit" className="btn btn-danger">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}