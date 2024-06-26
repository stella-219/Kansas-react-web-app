import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Profile() {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kanbas/Account/signin");
    };

    // update user info
    const updateUserInfo = () => {
        client.updateUser(currentUser)
            .then((updatedProfile) => {
                console.log("Fetched quiz data:", updatedProfile);
                dispatch(setCurrentUser(updatedProfile));
                setShowModal(true);
            })
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (field: string, value: string) => {
        dispatch(setCurrentUser({
            ...currentUser,
            [field]: value
        }));
    };

    return (
        <div>
            <h1>Profile</h1>
            {currentUser && (
                <div>
                    <div className="form-group row mb-3 justify-content-end">
                        <label htmlFor="wd-user-username" className="col-sm-2 col-form-label">
                            Username
                        </label>
                        <div className="col-sm-10 position-relative">
                            <input
                                id="wd-user-username"
                                value={currentUser.username}
                                className="form-control mb-2"
                                style={{ width: "300px" }}
                                onChange={(e) => handleInputChange("username", e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group row mb-3 justify-content-end">
                        <label htmlFor="wd-user-password" className="col-sm-2 col-form-label">
                            Password
                        </label>
                        <div className="col-sm-10 position-relative">
                            <input
                                id="wd-user-password"
                                value={currentUser.password}
                                className="form-control mb-2"
                                style={{ width: "300px" }}
                                onChange={(e) => handleInputChange("password", e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group row mb-3 justify-content-end">
                        <label htmlFor="wd-user-firstName" className="col-sm-2 col-form-label">
                            First Name
                        </label>
                        <div className="col-sm-10 position-relative">
                            <input
                                id="wd-user-firstName"
                                value={currentUser.firstName}
                                className="form-control mb-2"
                                style={{ width: "300px" }}
                                onChange={(e) => handleInputChange("firstName", e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group row mb-3 justify-content-end">
                        <label htmlFor="wd-user-lastName" className="col-sm-2 col-form-label">
                            Last Name
                        </label>
                        <div className="col-sm-10 position-relative">
                            <input
                                id="wd-user-lastName"
                                value={currentUser.lastName}
                                style={{ width: "300px" }}
                                className="form-control mb-2"
                                onChange={(e) => handleInputChange("lastName", e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group row mb-3 justify-content-end">
                        <label htmlFor="wd-user-dob" className="col-sm-2 col-form-label">
                            Date of Birth
                        </label>
                        <div className="col-sm-10 position-relative">
                            <input
                                id="wd-user-dob"
                                type="date"
                                value={currentUser.dob}
                                style={{ width: "300px" }}
                                className="form-control mb-2"
                                onChange={(e) => handleInputChange("dob", e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group row mb-3 justify-content-end">
                        <label htmlFor="wd-user-email" className="col-sm-2 col-form-label">
                            Email
                        </label>
                        <div className="col-sm-10 position-relative">
                            <input
                                id="wd-user-email"
                                value={currentUser.email}
                                style={{ width: "300px" }}
                                className="form-control mb-2"
                                onChange={(e) => handleInputChange("email", e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group row mb-3 justify-content-end">
                        <label htmlFor="wd-user-role" className="col-sm-2 col-form-label">
                            Role
                        </label>
                        <div className="col-sm-10 position-relative" >
                            <select
                                id="wd-user-role"
                                value={currentUser.role}
                                style={{ width: "300px" }}
                                onChange={(e) => handleInputChange("role", e.target.value)}
                                className="form-control mb-2">
                                {/* <option value="USER">User</option> */}
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div className="d-flex flex-column align-items-start">
                <button onClick={updateUserInfo} className="btn btn-success mb-3" style={{ width: "300px" }}>
                    Update user information
                </button>
                <button onClick={signout} className="btn btn-danger" style={{ width: "300px" }}>
                    Sign out
                </button>
            </div>

            {showModal && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Your profile has been updated successfully.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={closeModal}>
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}





// import * as client from "./client";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "./reducer";
// export default function Profile() {
//   const dispatch = useDispatch();
//   const [error, setError] = useState("");
//   const [profile, setProfile] = useState<any>({});
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   const signout = async () => {
//       await client.signout();
//       dispatch(setCurrentUser(null));
//       navigate("/Kanbas/Account/signin");
//   };

//   const fetchProfile = async () => {
//     try {
//       const account = await client.profile();
//       setProfile(account);
//     } catch (err: any) {
//       navigate("/Kanbas/Account/signin");
//     }
//   };
//   useEffect(() => {
//     fetchProfile();
//   }, []);

// // update user info
// const updateUserInfo = () => {
//   client.updateUser(profile)
//       .then((updatedProfile) => {
//           console.log("Fetched quiz data:", updatedProfile);
//           setProfile(updatedProfile);
//           dispatch(setCurrentUser(updatedProfile));
//           setShowModal(true);
//       })
// };

// const closeModal = () => {
//   setShowModal(false);
// };



//   return (
//     <div>
//       <h1>Profile</h1>
//       {profile && (
//         <div>
//           <div className="form-group row mb-3 justify-content-end">
//                         <label htmlFor="wd-user-username" className="col-sm-2 col-form-label">
//                             Username
//                         </label>
//                         <div className="col-sm-10 position-relative">
//                             <input
//                                 id="wd-user-username"
//                                 value={profile.username}
//                                 className="form-control mb-2"
//                                 onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
//                         </div>
//                     </div>

//                     <div className="form-group row mb-3 justify-content-end">
//                         <label htmlFor="wd-user-password" className="col-sm-2 col-form-label">
//                             Password
//                         </label>
//                         <div className="col-sm-10 position-relative">
//                             <input
//                                 id="wd-user-password"
//                                 value={profile.password}
//                                 className="form-control mb-2"
//                                 onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
//                         </div>
//                     </div>

//                     <div className="form-group row mb-3 justify-content-end">
//                         <label htmlFor="wd-user-firstName" className="col-sm-2 col-form-label">
//                             First Name
//                         </label>
//                         <div className="col-sm-10 position-relative">
//                             <input
//                                 id="wd-user-firstName"
//                                 value={profile.firstName}
//                                 className="form-control mb-2"
//                                 onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
//                         </div>
//                     </div>

//                     <div className="form-group row mb-3 justify-content-end">
//                         <label htmlFor="wd-user-lastName" className="col-sm-2 col-form-label">
//                             Last Name
//                         </label>
//                         <div className="col-sm-10 position-relative">
//                             <input
//                                 id="wd-user-lastName"
//                                 value={profile.lastName}
//                                 className="form-control mb-2"
//                                 onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
//                         </div>
//                     </div>

//                     <div className="form-group row mb-3 justify-content-end">
//                         <label htmlFor="wd-user-dob" className="col-sm-2 col-form-label">
//                             Date of Birth
//                         </label>
//                         <div className="col-sm-10 position-relative">
//                             <input
//                                 id="wd-user-dob"
//                                 type="date"
//                                 value={profile.dob}
//                                 className="form-control mb-2"
//                                 onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
//                         </div>
//                     </div>

//                     <div className="form-group row mb-3 justify-content-end">
//                         <label htmlFor="wd-user-email" className="col-sm-2 col-form-label">
//                             Email
//                         </label>
//                         <div className="col-sm-10 position-relative">
//                             <input
//                                 id="wd-user-email"
//                                 value={profile.email}
//                                 className="form-control mb-2"
//                                 onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
//                         </div>
//                     </div>

//                     <div className="form-group row mb-3 justify-content-end">
//                         <label htmlFor="wd-user-role" className="col-sm-2 col-form-label">
//                             Role
//                         </label>
//                         <div className="col-sm-10 position-relative" >
//                             <select
//                                 id="wd-user-role"
//                                 value={profile.role}
//                                 onChange={(e) => setProfile({ ...profile, role: e.target.value })} className="form-control mb-2">
//                                 <option value="USER">User</option>
//                                 <option value="FACULTY">Faculty</option>
//                                 <option value="STUDENT">Student</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <div className="form-group row mb-3 justify-content-end">
//                 <div className="col-sm-6 position-relative">
//                     <button onClick={updateUserInfo} className="btn btn-success w-100 mb-3">
//                         Update user information
//                     </button>
//                 </div>

//                 <div className="col-sm-6 position-relative">
//                     <button onClick={signout} className="btn btn-danger w-100">
//                         Sign out
//                     </button>
//                 </div>
//             </div>

//             {showModal && (
//                 <div className="modal" style={{ display: 'block' }}>
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <button type="button" className="close" onClick={closeModal}>
//                                     <span>&times;</span>
//                                 </button>
//                             </div>
//                             <div className="modal-body">
//                                 <p>Your profile has been updated successfully.</p>
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-primary" onClick={closeModal}>
//                                     OK
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                     </div>
//             )}
//             </div>
//     );
// }