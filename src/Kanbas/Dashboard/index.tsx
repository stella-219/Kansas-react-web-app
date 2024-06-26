import "./style.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "../Courses/client";
import * as acountClient from "../Account/client";
import { useSelector } from "react-redux";
import * as enrollmentClient from "../Courses/Enrollments/client";


export default function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    enrollInCourse,
    unenrollFromCourse,
}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
    enrollInCourse: (courseId: string) => void;
    unenrollFromCourse: (courseId: string) => void;
}) {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const userRole = currentUser?.role || "";

    // fetch published courses
    const [publishedCourses, setPublishedCourses] = useState<any[]>([]);
    const fetchPublishedCourses = async () => {
        const courses = await client.fetchPublishedCourses();
        setPublishedCourses(courses);
    };

    // fetch enrolled courses
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const fetchEnrolledCourses = async () => {
        try {
            const courses = await enrollmentClient.findMyEnrollments();
            console.log("Enrolled courses Fetched", courses);
            setEnrolledCourses(courses);
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
            setEnrolledCourses([]);
        }
    };

    useEffect(() => {
        fetchPublishedCourses();
        fetchEnrolledCourses();
    }, [currentUser]);

    // view all courses button
    const navigate = useNavigate();
    const handleViewAllCourses = () => {
        navigate('../AllCourses', { state: { courses } });
    };

    return (
        <div className="p-4" id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1><hr />
            {(userRole === "USER" || userRole === "FACULTY") && (
                <div>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={async () => {
                                await addNewCourse();
                                await fetchPublishedCourses();
                            }}>
                            Add
                        </button>

                        <button className="btn btn-warning float-end me-2"
                            id="wd-update-course-click"
                            onClick={async () => {
                                await updateCourse();
                                await fetchPublishedCourses();
                            }}>
                            Update
                        </button>

                    </h5><br />
                    <input value={course.name} className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    <hr />
                    <br />
                </div>
            )}

            {(userRole === "USER" || userRole === "FACULTY") && (
                <div>
                    <h2 id="wd-dashboard-published">My Courses ({publishedCourses.length})</h2> <hr />
                    <div id="wd-dashboard-courses" className="row">
                        <div className="row row-cols-1 row-cols-md-5 g-4">
                            {publishedCourses.map((course) => {
                                if (course) {
                                    return (
                                        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                                            <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none" >
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

                                                        <Link
                                                            to={`/Kanbas/Courses/${course._id}/Home`}
                                                            className="btn btn-primary">
                                                            Go
                                                        </Link>

                                                        <button onClick={async (event) => {
                                                            event.preventDefault();
                                                            await deleteCourse(course._id);
                                                            await fetchPublishedCourses();
                                                        }} className="btn btn-danger float-end"
                                                            id="wd-delete-course-click">
                                                            Delete
                                                        </button>

                                                        <button onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(course);
                                                        }}
                                                            className="btn btn-warning me-2 float-end"
                                                            id="wd-edit-course-click" >
                                                            Edit
                                                        </button>

                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                }

                            })}
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            )}

            <button onClick={handleViewAllCourses} className="btn btn-warning btn-warning float-end">
                View All Courses
            </button>

            <h2 id="wd-dashboard-published">
                Enrolled Courses ({enrolledCourses.length})
            </h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {enrolledCourses.map((course) => {
                        if (course) {
                            return (
                                <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                                    <Link
                                        to={`/Kanbas/Courses/${course._id}/Home`}
                                        className="text-decoration-none"
                                    >
                                        <div className="card rounded-3 overflow-hidden">
                                            <img src={course.image} height={160} alt={`${course.name} course`} />
                                            <div className="card-body">
                                                <span
                                                    className="wd-dashboard-course-link"
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "navy",
                                                        fontWeight: "bold",
                                                    }}
                                                >

                                                    {course.name}
                                                </span>

                                                <p
                                                    className="wd-dashboard-course-title card-text"
                                                    style={{ maxHeight: 53, overflow: "hidden" }}
                                                >
                                                    {course.description}
                                                </p>
                                                <a
                                                    href="#/Kanbas/Courses/1234/Home"
                                                    className="btn btn-primary"
                                                >
                                                    Go
                                                </a>
                                                <button
                                                    onClick={async(e) => {
                                                        e.preventDefault();
                                                        await unenrollFromCourse(course._id);
                                                        await fetchEnrolledCourses(); 
                                                    }}
                                                    className="btn btn-danger float-end"
                                                >
                                                    Unenroll
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>);
                        }

                    })}
                </div>
            </div>
            <hr />
        </div>
    );
}




// import "./style.css";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import * as client from "../Courses/client";
// import * as acountClient from "../Account/client";

// export default function Dashboard({
//     courses,
//     course,
//     setCourse,
//     addNewCourse,
//     deleteCourse,
//     updateCourse,
//     enrollInCourse,
//     unenrollFromCourse,
//     enrolledCourses
// }: {
//     courses: any[];
//     course: any;
//     setCourse: (course: any) => void;
//     addNewCourse: () => void;
//     deleteCourse: (course: any) => void;
//     updateCourse: () => void;
//     enrollInCourse: (courseId: string) => void;
//     unenrollFromCourse: (courseId: string) => void;
//     enrolledCourses: any[];
// }) {
//     // fetch all the published courses
//     const [publishedCourses, setPublishedCourses] = useState<any[]>([]);
//     const fetchPublishedCourses = async () => {
//         const courses = await client.fetchPublishedCourses();
//         setPublishedCourses(courses);
//     };

//     useEffect(() => {
//         fetchPublishedCourses();
//         fetchUserRole();
//     }, []);

//     // view all courses button
//     const navigate = useNavigate();
//     const handleViewAllCourses = () => {
//         navigate('../AllCourses', { state: { courses } });
//     };

//     // Fetch user role
//     const [userRole, setUserRole] = useState<string>("");
//     const fetchUserRole = async () => {
//         try {
//             const currentUser = await acountClient.profile();
//             setUserRole(currentUser.role);
//         } catch (error) {
//             console.error("Error fetching user role:", error);
//         }
//     };


//     return (
//         <div className="p-4" id="wd-dashboard">
//             <h1 id="wd-dashboard-title">Dashboard</h1><hr />
//             {(userRole === "USER" || userRole === "FACULTY") && (
//                 <div>
//                     <h5>New Course
//                         <button className="btn btn-primary float-end"
//                             id="wd-add-new-course-click"
//                             onClick={async () => {
//                                 await addNewCourse();
//                                 await fetchPublishedCourses();
//                             }}>
//                             Add
//                         </button>

//                         <button className="btn btn-warning float-end me-2"
//                             id="wd-update-course-click"
//                             onClick={async () => {
//                                 await updateCourse();
//                                 await fetchPublishedCourses();
//                             }}>
//                             Update
//                         </button>

//                     </h5><br />
//                     <input value={course.name} className="form-control mb-2"
//                         onChange={(e) => setCourse({ ...course, name: e.target.value })} />
//                     <textarea value={course.description} className="form-control"
//                         onChange={(e) => setCourse({ ...course, description: e.target.value })} />
//                     <hr />
//                     <br />
//                 </div>
//             )}



//             {(userRole === "USER" || userRole === "FACULTY") && (
//                 <div>
//                     <h2 id="wd-dashboard-published">My Courses ({publishedCourses.length})</h2> <hr />
//                     <div id="wd-dashboard-courses" className="row">
//                         <div className="row row-cols-1 row-cols-md-5 g-4">
//                             {publishedCourses.map((course) => {
//                                 return (
//                                     <div className="wd-dashboard-course col" style={{ width: "300px" }}>
//                                         <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none" >
//                                             <div className="card rounded-3 overflow-hidden">
//                                                 <img src={course.image} height={160} alt={`${course.name} course`} />
//                                                 <div className="card-body">
//                                                     <span className="wd-dashboard-course-link"
//                                                         style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
//                                                         {course.name}
//                                                     </span>
//                                                     <p className="card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
//                                                         {course.description}
//                                                     </p>

//                                                     <Link
//                                                         to={`/Kanbas/Courses/${course._id}/Home`}
//                                                         className="btn btn-primary">
//                                                         Go
//                                                     </Link>

//                                                     <button onClick={async (event) => {
//                                                         event.preventDefault();
//                                                         await deleteCourse(course._id);
//                                                         await fetchPublishedCourses();
//                                                     }} className="btn btn-danger float-end"
//                                                         id="wd-delete-course-click">
//                                                         Delete
//                                                     </button>

//                                                     <button onClick={(event) => {
//                                                         event.preventDefault();
//                                                         setCourse(course);
//                                                     }}
//                                                         className="btn btn-warning me-2 float-end"
//                                                         id="wd-edit-course-click" >
//                                                         Edit
//                                                     </button>

//                                                 </div>
//                                             </div>
//                                         </Link>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                     <br />
//                     <br />
//                 </div>
//             )}

//             <button onClick={handleViewAllCourses} className="btn btn-warning btn-warning float-end">
//                 View All Courses
//             </button>

//             <h2 id="wd-dashboard-published">
//                 Enrolled Courses ({enrolledCourses.length})
//             </h2>
//             <hr />
//             <div id="wd-dashboard-courses" className="row">
//                 <div className="row row-cols-1 row-cols-md-5 g-4">
//                     {enrolledCourses.map((course) => (
//                         <div className="wd-dashboard-course col" style={{ width: "300px" }}>
//                             <Link
//                                 to={`/Kanbas/Courses/${course._id}/Home`}
//                                 className="text-decoration-none"
//                             >
//                                 <div className="card rounded-3 overflow-hidden">
//                                     <img src={course.image} height={160} alt={`${course.name} course`} />
//                                     <div className="card-body">
//                                         <span
//                                             className="wd-dashboard-course-link"
//                                             style={{
//                                                 textDecoration: "none",
//                                                 color: "navy",
//                                                 fontWeight: "bold",
//                                             }}
//                                         >

//                                             {course.name}
//                                         </span>

//                                         <p
//                                             className="wd-dashboard-course-title card-text"
//                                             style={{ maxHeight: 53, overflow: "hidden" }}
//                                         >
//                                             {course.description}
//                                         </p>
//                                         <a
//                                             href="#/Kanbas/Courses/1234/Home"
//                                             className="btn btn-primary"
//                                         >
//                                             Go
//                                         </a>
//                                         <button
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 unenrollFromCourse(course._id);
//                                             }}
//                                             className="btn btn-danger float-end"
//                                         >
//                                             Unenroll
//                                         </button>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <hr />
//         </div>
//     );
// }




// // import { Link } from "react-router-dom";
// // import "./index.css";
// // export default function Dashboard({
// //   courses,
// //   course,
// //   setCourse,
// //   addNewCourse,
// //   deleteCourse,
// //   updateCourse,
// // }: {
// //   courses: any[];
// //   course: any;
// //   setCourse: (course: any) => void;
// //   addNewCourse: () => void;
// //   deleteCourse: (courseId: string) => void;
// //   updateCourse: () => void;
// // }) {
// //   return (
// //     <div id="wd-dashboard" className="container-fluid">
// //       <h1 id="wd-dashboard-title">Dashboard</h1>
// //       <hr />
// //       <h5>New Course
// //           <button className="btn btn-primary float-end"
// //                   id="wd-add-new-course-click"
// //                   onClick={addNewCourse} > Add </button>
// //           <button
// //           className="btn btn-warning float-end me-2"
// //           onClick={updateCourse}
// //           id="wd-update-course-click"
// //         >
// //           Update
// //         </button>
// //       </h5><hr /><br/>
// //       <input value={course.name} className="form-control mb-2"
// //          onChange={(e) => setCourse({ ...course, name: e.target.value }) } />

// //       <textarea value={course.description} className="form-control"
// //       onChange={(e) => setCourse({ ...course, description: e.target.value }) }/><hr />
// //       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
// //       <hr />
// //       <div id="wd-dashboard-courses" className="row">
// //         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
// //           {courses.map((course) => (
// //             <div key={course._id} className="col">
// //               <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">
// //                 <div className="card rounded-3 overflow-hidden h-100">
// //                   <img src={course.image} className="card-img-top" alt={course.name} style={{ height: '160px', objectFit: 'cover' }} />
// //                   <div className="card-body d-flex flex-column">
// //                     <span className="wd-dashboard-course-link mb-2" style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
// //                       {course.name}
// //                     </span>
// //                     <p className="wd-dashboard-course-title card-text mb-4" style={{ maxHeight: '53px', overflow: 'hidden' }}>
// //                       {course.description}
// //                     </p>
// //                     <div>
// //                      <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>
// //                      <button onClick={(event) => {
// //                       event.preventDefault();
// //                       deleteCourse(course._id);
// //                     }} className="btn btn-danger float-end"
// //                     id="wd-delete-course-click">
// //                        Delete
// //                      </button>
// //                      <button
// //                       id="wd-edit-course-click"
// //                       onClick={(event) => {
// //                         event.preventDefault();
// //                         setCourse(course);
// //                       }}
// //                       className="btn btn-warning me-2 float-end"
// //                     >
// //                       Edit
// //                     </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </Link>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }