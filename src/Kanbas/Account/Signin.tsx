import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Signin() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState<any>({});
  const navigate = useNavigate();
  const signin = async () => {
    try {
      const currentUser = await client.signin(credentials);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Sign in</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        style={{width:"300px"}}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        value={credentials.username}
        className="form-control mb-2 ms-2"
        placeholder="username"
      />
      <input
        style={{width:"300px"}}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        value={credentials.password}
        className="form-control mb-2 ms-2"
        placeholder="password"
        type="password"
      />
      <button style={{ width: "300px" }} onClick={signin} className="btn btn-primary">
        {" "}
        Sign in{" "}
      </button>
      <br />
    </div>
  );
}
