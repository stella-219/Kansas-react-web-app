import { Link } from "react-router-dom";
import * as db from "../Database";
import "./index.css";
export default function Dashboard() {
  const courses = db.courses
  return (
    <div id="wd-dashboard" className="container-fluid">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
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