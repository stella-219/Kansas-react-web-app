import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa6";
import QuestionIndex from "./Quizzes/QuestionEditor";
import Edit from "./Quizzes/QuestionEditor/Edit";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes/QuizEntry";
import Detail from "./Quizzes/QuizEntry/Detail";
import EditorDetail from "./Quizzes/QuizEntry/EditorDetail";
import EditorQuestions from "./Quizzes/QuizEntry/EditorQuestions";
import QuizPage from "./Quizzes/QuizPage";
import QuizAnswer from "./Quizzes/Answers";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid)
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:id" element={<AssignmentEditor />} />
            <Route path="Grades" element={<Grades />} />
            <Route path="Quizzes/:qid/QuestionList" element={<QuestionIndex />} />
            <Route path="Quizzes/:qid/edit/:questionId" element={<Edit />} />
            <Route path="Quizzes/:qid/edit/NewQuestion" element={<Edit />} />
            <Route path="Quizzes/:quizID/edit/:questionId" element={<Edit />} />
            
            <Route path="People" element={<PeopleTable />} />
            <Route path="People/:uid" element={<PeopleTable />} />
            <Route path="Quizzes/:quizID/takequiz" element = {<QuizPage />} />
            <Route path="Quizzes/:quizID/Answers/:uid" element = {<QuizAnswer />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/newquestions" element={<EditorQuestions />} />
              <Route path="Quizzes/:qid/editquestions" element={<EditorQuestions />} />
              <Route path="Quizzes/newdetail" element={<EditorDetail />} />
              <Route path="Quizzes/:qid/editdetail" element={<EditorDetail />} />
              <Route path="Quizzes/:qid" element={<Detail />} />
            </Routes>
        </div>
      </div>
    </div>
  );
}


