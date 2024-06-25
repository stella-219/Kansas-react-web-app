import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Signup() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        style={{width:"300px"}}
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="form-control mb-2 ms-2"
        placeholder="username"
      />
      <input
        style={{width:"300px"}}
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        className="form-control mb-2 ms-2"
        placeholder="password"
      />
      <button style={{width:"300px"}} onClick={signup} className="btn btn-primary mb-2">
        {" "}
        Sign up{" "}
      </button>
      <br />
    </div>
  );
}
