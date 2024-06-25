import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import * as client from "./Courses/client";
import * as enrollmentClient from "./Courses/Enrollments/client";
import * as acountClient from "./Account/client";
import Account from "./Account";
import Session from "./Account/Session";
import ProtectedRoute from "./ProtectedRoute";
import AllCourses from "./Dashboard/AllCourses";
import React from "react";

export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    
    // Retrieving Courses
    const fetchCourses = async () => {
        try {
            const courses = await client.fetchAllCourses();
            console.log("Fetched courses:", courses);
            setCourses(courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setCourses([]);
        }
    };

    // Retrieving enrolled Courses
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
        fetchCourses();
        fetchEnrolledCourses();
        console.log("enrolled courses are rendered")
    }, []);


    const [course, setCourse] = useState<any>({
        _id: "0",
        name: "New Course",
        number: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
    });

    // Creating New Courses
    const addNewCourse = async () => {
        try {
            const updatedCourse = {
                ...course,
                number: Date.now().toString() + Math.random().toString(36).substr(2, 9)
            };
            setCourse(updatedCourse);
            const newCourse = await client.createCourse(updatedCourse);
            setCourses([...courses, newCourse]);
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

    // Deleting a Course
    const deleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
        setCourses(
            courses.filter((course) => course._id !== courseId)
        );
    };

    // Updating a Course
    const updateCourse = async () => {
        await client.updateCourse(course);
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };

    // Enrolling in a Course
    const enrollInCourse = async (courseId: string) => {
        await enrollmentClient.createEnrollment(courseId);
        fetchEnrolledCourses();
    };

    // Unenrolling from a Course
    const unenrollFromCourse = async (courseId: string) => {
        await enrollmentClient.deleteEnrollment(courseId);
        fetchEnrolledCourses();
    };

    return (
        <Provider store={store}>
            <Session>
                <div id="wd-kanbas" className="h-200">
                    <div className="d-flex h-200">
                        <div className="d-none d-md-block bg-black">
                            <KanbasNavigation />
                        </div>
                        <div className="flex-fill p-4">
                            <Routes>
                                <Route path="/" element={<Navigate to="Dashboard" />} />
                                <Route path="/Account/*" element={<Account />} />
                                <Route path="Dashboard" element={
                                    <ProtectedRoute>
                                        <Dashboard
                                            courses={courses}
                                            course={course}
                                            setCourse={setCourse}
                                            addNewCourse={addNewCourse}
                                            deleteCourse={deleteCourse}
                                            updateCourse={updateCourse}
                                            enrollInCourse={enrollInCourse}
                                            unenrollFromCourse={unenrollFromCourse}
                                        />
                                    </ProtectedRoute>
                                } />
                                <Route path="AllCourses" element={
                                    <AllCourses
                                        courses={courses}
                                        enrollInCourse={enrollInCourse}
                                    />
                                } />
                                <Route path="Courses/:cid/*" element={
                                    <ProtectedRoute>
                                        <Courses courses={courses} />
                                    </ProtectedRoute>} />

                                <Route path="Calendar" element={<h1>Calendar</h1>} />
                                <Route path="Inbox" element={<h1>Inbox</h1>} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Session>
        </Provider>
    )
};


// import Dashboard from "./Dashboard";
// import KanbasNavigation from "./Navigation";
// import { Routes, Route, Navigate } from "react-router";
// import Courses from "./Courses";
// import "./styles.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect, useState } from "react";
// import store from "./store";
// import { Provider } from "react-redux";
// import * as client from "./Courses/client";
// import * as enrollmentClient from "./Courses/Enrollments/client";
// import * as acountClient from "./Account/client";
// import Account from "./Account";
// import Session from "./Account/Session";
// import ProtectedRoute from "./ProtectedRoute";
// import AllCourses from "./Dashboard/AllCourses";

// export default function Kanbas() {
//     const [courses, setCourses] = useState<any[]>([]);
//     const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

//     // Retrieving Courses
//     const fetchCourses = async () => {
//         const courses = await client.fetchAllCourses();
//         setCourses(courses);
//     };


//     //  Fetch user role
//     const [userRole, setUserRole] = useState<string>("");
//     const fetchUserRole = async () => {
//         try {
//             const currentUser = await acountClient.profile();
//             console.log("Fetched user role:", currentUser);
//             setUserRole(currentUser.role);
//         } catch (error) {
//             console.error("Error fetching user role:", error);
//         }
//     };

//     // Retrieving enrolled Courses
//     const fetchEnrolledCourses = async () => {
//         const courses = await enrollmentClient.findMyEnrollments();
//         setEnrolledCourses(courses);
//     };

//     // Fetch user and set user state
//     const [user, setUser] = useState<any>(null);
//     const fetchUser = async () => {
//         try {
//             const currentUser = await acountClient.profile();
//             console.log("Fetched user:", currentUser);
//             if (currentUser) {
//                 setUser(currentUser);
//                 const courses = await enrollmentClient.findMyEnrollments();
//                 setEnrolledCourses(courses);
//             }
//             else {
//                 setUser(null);
//                 setEnrolledCourses([]);
//             }
//         } catch (error) {
//             console.error("Error fetching user:", error);
//         }
//     };

//     useEffect(() => {
//         fetchCourses();
//         fetchUserRole();
//         fetchUser();
//     }, []);


//     const [course, setCourse] = useState<any>({
//         _id: "0",
//         name: "New Course",
//         number: Date.now().toString() + Math.random().toString(36).substr(2, 9),
//         startDate: "2023-09-10",
//         endDate: "2023-12-15",
//         image: "/images/reactjs.jpg",
//         description: "New Description",
//     });

//     // Creating New Courses
//     const addNewCourse = async () => {
//         try {
//             const updatedCourse = {
//                 ...course,
//                 number: Date.now().toString() + Math.random().toString(36).substr(2, 9)
//             };
//             setCourse(updatedCourse);
//             const newCourse = await client.createCourse(updatedCourse);
//             setCourses([...courses, newCourse]);
//         } catch (error) {
//             console.error("Error creating course:", error);
//         }
//     };

//     // Deleting a Course
//     const deleteCourse = async (courseId: string) => {
//         await client.deleteCourse(courseId);
//         setCourses(
//             courses.filter((course) => course._id !== courseId)
//         );
//     };

//     // Updating a Course
//     const updateCourse = async () => {
//         await client.updateCourse(course);
//         setCourses(
//             courses.map((c) => {
//                 if (c._id === course._id) {
//                     return course;
//                 } else {
//                     return c;
//                 }
//             })
//         );
//     };

//     // Enrolling in a Course
//     const enrollInCourse = async (courseId: string) => {
//         await enrollmentClient.createEnrollment(courseId);
//         fetchEnrolledCourses();
//     };

//     // Unenrolling from a Course
//     const unenrollFromCourse = async (courseId: string) => {
//         await enrollmentClient.deleteEnrollment(courseId);
//         fetchEnrolledCourses();
//     };

//     return (
//         <Provider store={store}>
//             <Session>
//                 <div id="wd-kanbas" className="h-200">
//                     <div className="d-flex h-200">
//                         <div className="d-none d-md-block bg-black">
//                             <KanbasNavigation />
//                         </div>
//                         <div className="flex-fill p-4">
//                             <Routes>
//                                 <Route path="/" element={<Navigate to="Dashboard" />} />
//                                 <Route path="/Account/*" element={<Account />} />
//                                 <Route path="Dashboard" element={
//                                     <ProtectedRoute>
//                                         <Dashboard
//                                             courses={courses}
//                                             course={course}
//                                             setCourse={setCourse}
//                                             addNewCourse={addNewCourse}
//                                             deleteCourse={deleteCourse}
//                                             updateCourse={updateCourse}
//                                             enrollInCourse={enrollInCourse}
//                                             unenrollFromCourse={unenrollFromCourse}
//                                             enrolledCourses={enrolledCourses}
//                                         />
//                                     </ProtectedRoute>
//                                 } />
//                                 <Route path="AllCourses" element={
//                                     <AllCourses
//                                         courses={courses}
//                                         enrollInCourse={enrollInCourse}
//                                     />
//                                 } />
//                                 <Route path="Courses/:cid/*" element={
//                                     <ProtectedRoute>
//                                         <Courses courses={courses} />
//                                     </ProtectedRoute>} />

//                                 <Route path="Calendar" element={<h1>Calendar</h1>} />
//                                 <Route path="Inbox" element={<h1>Inbox</h1>} />
//                             </Routes>
//                         </div>
//                     </div>
//                 </div>
//             </Session>
//         </Provider>
//     )
// };




// // import KanbasNavigation from "./Navigation";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import Dashboard from "./Dashboard";
// // import Courses from "./Courses";
// // import * as client from "./Courses/client";
// // import React, { useEffect, useState } from "react";
// // import store from "./store";
// // import { Provider } from "react-redux";
// // import Account from "./Account";
// // import Session from "./Account/Session";
// // import ProtectedRoute from "./ProtectedRoute";

// // export default function Kanbas() {
// //   const [courses, setCourses] = useState<any[]>([]);
// //   const fetchCourses = async () => {
// //     const courses = await client.fetchAllCourses();
// //     setCourses(courses);
// //   };
// //   useEffect(() => {
// //     fetchCourses();
// //   }, []);
// //   const [course, setCourse] = useState<any>({
// //     _id: "1234",
// //     name: "New Course",
// //     number: "New Number",
// //     image: "/images/reactjs.jpg",
// //     startDate: "2023-09-10",
// //     endDate: "2023-12-15",
// //     description: "New Description",
// //   });
// //   const addNewCourse = async () => {
// //     const newCourse = await client.createCourse(course);
// //     setCourses([...courses, newCourse]);
// //   };
// //   const deleteCourse = async (courseId: string) => {
// //     await client.deleteCourse(courseId);
// //     setCourses(courses.filter((c) => c._id !== courseId));
// //   };
// //   const updateCourse = async () => {
// //     await client.updateCourse(course);
// //     setCourses(
// //       courses.map((c) => {
// //         if (c._id === course._id) {
// //           return course;
// //         } else {
// //           return c;
// //         }
// //       })
// //     );
// //   };
// //   return (
// //     <Provider store={store}>
// //       <Session>
// //         <div id="wd-kanbas" className="h-100">
// //           <div className="d-flex h-100">
// //             <div className="d-none d-md-block bg-black">
// //               <KanbasNavigation />
// //             </div>
// //             <div className="flex-fill p-4">
// //               <Routes>
// //                 <Route path="/" element={<Navigate to="Dashboard" />} />
// //                 <Route path="Account/*" element={<Account />} />
// //                 <Route
// //                   path="Dashboard"
// //                   element={
// //                     <ProtectedRoute>
// //                       <Dashboard
// //                         courses={courses}
// //                         course={course}
// //                         setCourse={setCourse}
// //                         addNewCourse={addNewCourse}
// //                         deleteCourse={deleteCourse}
// //                         updateCourse={updateCourse}
// //                       />
// //                     </ProtectedRoute>
// //                   }
// //                 />
// //                 <Route
// //                   path="Courses/:cid/*"
// //                   element={
// //                     <ProtectedRoute>
// //                       <Courses courses={courses} />
// //                     </ProtectedRoute>
// //                   }
// //                 />
// //               </Routes>
// //             </div>
// //           </div>
// //         </div>
// //       </Session>
// //     </Provider>
// //   );
// // }
