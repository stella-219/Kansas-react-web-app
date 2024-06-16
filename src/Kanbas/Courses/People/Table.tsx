import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams } from "react-router-dom";
import PeopleDetails from "./Details";
import { FaPlus } from "react-icons/fa";
export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div id="wd-people-table">
      <button onClick={createUser} className="float-end btn btn-danger">
        <FaPlus className="me-2" />
        People
      </button>
      <input onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
             className="form-control float-start w-25 me-2" />
      <select value={role} onChange={(e) =>filterUsersByRole(e.target.value)} className="form-select float-start w-25" >
        <option value="">All Roles</option>        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>     <option value="FACULTY">Faculty</option>
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="text-nowrap">
                <Link to={`/Kanbas/Courses/${cid}/People/${user._id}`}>
                  {user.firstName} {user.lastName}
                </Link>
              </td>
              <td>{user.loginId}</td><td>{user.section}</td><td>{user.role}</td><td>{user.lastActivity}</td>
              <td>{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PeopleDetails fetchUsers={fetchUsers} />
    </div>
  );
}
