import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["profile"] : ["signin", "signup"];
  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link to={`/Kanbas/Account/${link}`} className={`border border-0 list-group-item
           ${ pathname.includes(link) ? "active text-black" : "text-danger" }`}> {link} </Link>
      ))}
    </div>
  );
}
