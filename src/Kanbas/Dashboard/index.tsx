import { Link } from "react-router-dom";
import "./index.css";
export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  return (
    <div id="wd-dashboard" className="container-fluid">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={addNewCourse} > Add </button>
          <button
          className="btn btn-warning float-end me-2"
          onClick={updateCourse}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5><hr /><br/>
      <input value={course.name} className="form-control mb-2"
         onChange={(e) => setCourse({ ...course, name: e.target.value }) } />

      <textarea value={course.description} className="form-control"
      onChange={(e) => setCourse({ ...course, description: e.target.value }) }/><hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col">
              <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">
                <div className="card rounded-3 overflow-hidden h-100">
                  <img src={course.image} className="card-img-top" alt={course.name} style={{ height: '160px', objectFit: 'cover' }} />
                  <div className="card-body d-flex flex-column">
                    <span className="wd-dashboard-course-link mb-2" style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                      {course.name}
                    </span>
                    <p className="wd-dashboard-course-title card-text mb-4" style={{ maxHeight: '53px', overflow: 'hidden' }}>
                      {course.description}
                    </p>
                    <div>
                     <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>
                     <button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }} className="btn btn-danger float-end"
                    id="wd-delete-course-click">
                       Delete
                     </button>
                     <button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}