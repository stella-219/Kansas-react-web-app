import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheck from "./GreenCheck";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <GreenCheck />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}