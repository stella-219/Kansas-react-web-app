import { Link, useParams, useLocation } from "react-router-dom";
import "./index.css";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const location = useLocation();
  
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="list-group rounded-0">
      {links.map((link) => {
        const isActive = location.pathname.includes(link);
        return (
          <Link
            key={link}
            to={`/Kanbas/Courses/${cid}/${link}`}
            className={`list-group-item border border-0 ${isActive ? "active" : "text-danger"}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
