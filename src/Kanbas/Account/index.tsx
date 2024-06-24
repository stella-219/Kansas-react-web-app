import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Signin";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import Signup from "./Signup";

export default function Account() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div>
        <div className="d-flex mt-3">
            <div className="d-none d-md-block">
            <AccountNavigation />
            </div>
            <div className="flex-fill p-4 pt-0">
            <Routes>
            <Route path="/" element={<Navigate to={ currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin" }/>}/>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            </div>
        </div>
        </div>
    );
}