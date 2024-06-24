import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllCourses({ courses, enrollInCourse }: { courses: any[], enrollInCourse: (courseId: string) => void }) {
    const navigate = useNavigate();
    return (
        <div className="p-4">
            <h2 id="wd-dashboard-all-courses">All Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => {
                        return (
                            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                                <div className="card rounded-3 overflow-hidden">
                                    <img src={course.image} height={160} alt={`${course.name} course`} />
                                    <div className="card-body">
                                        <span className="wd-dashboard-course-link"
                                            style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
                                            {course.name}
                                        </span>
                                        <p className="card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                                            {course.description}
                                        </p>
                                        <button
                                            onClick={() => {
                                                enrollInCourse(course._id);
                                                navigate('../Dashboard');
                                            }}
                                            className="btn btn-success float-end"
                                        >
                                            Enroll
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}