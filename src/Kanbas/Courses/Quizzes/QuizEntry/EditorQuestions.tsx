import { BsThreeDotsVertical } from "react-icons/bs";
import { RiForbidLine } from "react-icons/ri";
import { Link, useLocation, useParams } from "react-router-dom";
import EditorNavigation from "./EditorNavigation";
import { FaPlus } from "react-icons/fa";

export default function EditorQuestions() {
    const { pathname } = useLocation();
    const { cid } = useParams();
    const qid = pathname.split("/")[5];

    return (
        <div id="wd-quiz-editor" className="p-4">
            <div className="d-flex justify-content-end">
                <div className="text-nowrap">
                    <div id="quiz-points" className="float-end py-2" >
                        Points xxx
                    </div>
                </div>
            </div>

            <EditorNavigation pathname={pathname} />

            <div className="d-flex justify-content-center">
                <button id="options-button" className="btn btn btn-light border mt-4 mb-2" >
                    <FaPlus className="position-relative mb-1 me-1" />
                    New Question
                </button>
            </div>
            <hr />

            <div className="d-flex justify-content-start">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                    <button type="button" className="btn btn-light border me-2 ms-5 board">
                        Cancel
                    </button>
                </Link>

                <button type="submit" className="btn btn-danger">
                    Save
                </button>
            </div>


        </div >
    )
}