export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name"><b>Assignment Name</b></label><br></br>
            <br></br>
            <input id="wd-name" value="A1 - ENV + HTML" />
            <br /><br />
            <textarea id="wd-description" cols={45} rows={10}>
                The assignment is available online
                Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
                Your full name and section
                Links to each of the lab assignements
                Link to the Kanbas application
                Links to all relevant source code repositories
                The Kanbas application should include a link to navigate back to the landing page
            </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr><br></br>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group"> Assignment Group </label>
                        <select id="wd-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        </select>
                    </td>
                </tr><br></br>
                <tr>
                    <td>
                        <label htmlFor="wd-display-grade-as"> Display Grade as </label>
                        <select id="wd-display-grade-as">
                            <option value="Percentage">Percentage</option>
                        </select>
                    </td>
                </tr><br></br>
                <tr>
                    <td>
                        <label htmlFor="wd-submission-type">Submission Type</label>
                            <select id="wd-submission-type">
                                <option value="Online">Online</option>
                            </select><br></br>
                        <div>
                            <label>Online Entry Options</label>
                        </div>
                        <div>
                            <input type="checkbox" name="Text Entry" id="wd-text-entry" />
                            <label htmlFor="wd-text-entry">Text Entry</label>
                        </div>
                        <div>
                            <input type="checkbox" name="Website URL" id="wd-website-url" />
                            <label htmlFor="wd-website-url">Website URL</label>
                        </div>
                        <div>
                            <input type="checkbox" name="Media Recordings" id="wd-media-recordings" />
                            <label htmlFor="wd-media-recordings">Media Recordings</label>
                        </div>
                        <div>
                            <input type="checkbox" name="Student Annotation" id="wd-student-annotation" />
                            <label htmlFor="wd-student-annotation">Student Annotation</label>
                        </div>
                        <div>
                            <input type="checkbox" name="File Uploads" id="wd-file-upload" />
                            <label htmlFor="wd-file-upload">File Uploads</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="wd-assign-to">Assign Assign to</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input id="wd-assign-to" value={"Everyone"} />
                    </td>
                </tr><br></br>
                <tr>
                    <td>
                <label htmlFor="wd-due-date"> Due </label>
                    </td>
                </tr>
                <tr>
                    <td>
                <input type="date"
                    id="wd-due-date"
                    value="2024-05-13"/><br/>
                   </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="wd-available-from"> Available From </label>
                        <label htmlFor="wd-available-until"> Until </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="date" id="wd-available-from" value="2024-05-06" />
                        <input type="date" id="wd-available-until" value="2024-05-20" />
                        </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                      <button>Cancel</button> <button>Save</button>
                    </td>
                </tr>
            </table>
        </div>
    );
}
