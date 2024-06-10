import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AssignmentControls({ course }: any) {
    return (
        <div className="text-nowrap">
            <Link to={`/Kanbas/Courses/${course}/Assignments/new`}>
                <button className="btn btn-lg btn-danger me-1 float-end">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Assignment
                </button>
            </Link>


            <button className="btn btn-lg btn-light me-1 float-end" style={{ border: '1px solid #DCDCDC' }}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </button>
        </div>
    );
}