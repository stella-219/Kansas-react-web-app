import { BsThreeDotsVertical } from "react-icons/bs";
import { RiForbidLine } from "react-icons/ri";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import EditorNavigation from "./EditorNavigation";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { addQuiz, editQuiz } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { setQuizDetails } from "./reducer";
import Editor from "react-simple-wysiwyg";

export default function EditorDetail() {
  const { pathname } = useLocation();
  const { cid } = useParams<{ cid: string }>();
  // const qid = pathname.split("/")[5];
  const {qid} = useParams();
  const isEdit = pathname.includes("edit");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // extract quiz details from redux
  const allQuizzes = useSelector((state: any) =>
    state.quizzesReducer ? state.quizzesReducer.quizzes : []
  );
  const currQuiz = allQuizzes.find(
    (quiz: any) => quiz.course === cid && quiz._id === qid
  );

  // Retrieving details for a quiz
  const fetchQuizDetails = async () => {
    try {
      const details = await client.findQuizDetails(cid as string, qid as string);
      dispatch(setQuizDetails(details));
    } catch (error) {
      console.error("Failed to fetch quiz details:", error);
    }
  };
  useEffect(() => {
    if (isEdit) {
      fetchQuizDetails();
    }
  }, [cid, qid]);

  const currentDate = new Date();
  const [title, setTitle] = useState(
    currQuiz ? currQuiz.title : "Unnamed quiz"
  );
  const [description, setDescription] = useState(
    currQuiz ? currQuiz.description : ""
  );
  const [quizType, setQuizType] = useState(
    currQuiz ? currQuiz.quiz_type : "Graded Quiz"
  );
  const [points, setPoints] = useState(currQuiz ? currQuiz.points : "");
  const [assignmentGroup, setAssignmentGroup] = useState(
    currQuiz ? currQuiz.assignment_group : "Quizzes"
  );

  const [isShuffleAnswers, setIsShuffleAnswers] = useState(
    currQuiz ? currQuiz.shuffle_answers : "Yes"
  );
  const [isTimeLimit, setIsTimeLimit] = useState(
    currQuiz ? currQuiz.time_limit : "Yes"
  );
  const [howLong, setHowLong] = useState(currQuiz ? currQuiz.how_long : "20");
  const [isMutipleAttempts, setIsMutipleAttempts] = useState(
    currQuiz ? currQuiz.multiple_attempts : "No"
  );
  const [howManyAttempts, setHowManyAttempts] = useState(
    currQuiz ? currQuiz.how_many_attempts : "1"
  );
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(
    currQuiz ? currQuiz.show_correct_answers : "Immediately"
  );
  const [isAccessCode, setIsAccessCode] = useState(
    currQuiz ? currQuiz.access_code : "No"
  );
  const [accessCodeNumber, setAccessCodeNumber] = useState(
    currQuiz ? currQuiz.access_code_number : ""
  );

  const [isOneQuestionAtATime, setIsOneQuestionAtATime] = useState(
    currQuiz ? currQuiz.one_question_at_a_time : "Yes"
  );
  const [isWebcamRequired, setIsWebcamRequired] = useState(
    currQuiz ? currQuiz.webcam_required : "No"
  );
  const [isLockQuestionsAfterAnswering, setIsLockQuestionsAfterAnswering] =
    useState(currQuiz ? currQuiz.lock_questions_after_answering : "No");

  const [dueDate, setDueDate] = useState(
    currQuiz
      ? currQuiz.due_date
      : currentDate.toISOString().slice(0, 10) + "T00:00"
  );
  const [availableDate, setAvailableDate] = useState(
    currQuiz
      ? currQuiz.available_date
      : currentDate.toISOString().slice(0, 10) + "T00:00"
  );
  const [availableUntil, setAvailableUntil] = useState(
    currQuiz
      ? currQuiz.until_date
      : currentDate.toISOString().slice(0, 10) + "T00:00"
  );

  const [isPublished, setIsPublished] = useState(
    currQuiz ? currQuiz.published : "Unpublished"
  );

  const quiz = {
    _id: isEdit ? qid : Date.now().toString(),
    course: cid,
    title: title,
    description: description,
    quiz_type: quizType,
    points: points,
    assignment_group: assignmentGroup,
    shuffle_answers: isShuffleAnswers,
    time_limit: isTimeLimit,
    ...(isTimeLimit === "Yes" && { how_long: howLong }),

    multiple_attempts: isMutipleAttempts,
    ...(isMutipleAttempts === "Yes" && { how_many_attempts: howManyAttempts }),

    show_correct_answers: showCorrectAnswers,
    access_code: isAccessCode,
    ...(isAccessCode === "Yes" && { access_code_number: accessCodeNumber }),

    one_question_at_a_time: isOneQuestionAtATime,
    webcam_required: isWebcamRequired,
    lock_questions_after_answering: isLockQuestionsAfterAnswering,
    due_date: dueDate,
    available_date: availableDate,
    until_date: availableUntil,
    published: isPublished,
  };

  // Update or create a quiz
  const handleSavaQuiz = async () => {
    if (isEdit) {
      await client.updateQuiz(quiz);
      dispatch(editQuiz(quiz));
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    } else {
      const newQuiz = await client.createQuiz(cid as string, quiz);
      dispatch(addQuiz(newQuiz));
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`);
    }
  };

  // handle save and publish button at the bottom
  const handleSaveAndPublish = async () => {
    const quizToSave = {
      ...quiz,
      published: "Published",
    };

    try {
      if (isEdit) {
        await client.updateQuiz(quizToSave);
        dispatch(editQuiz(quizToSave));
      } else {
        const newQuiz = await client.createQuiz(cid as string, quizToSave);
        dispatch(addQuiz(newQuiz));
      }
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving and publishing quiz:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSavaQuiz();
      }}
    >
      <div id="wd-quiz-editor" className="p-4">
        <div className="d-flex justify-content-end mb-1">
          <div className="text-nowrap">
            <button
              id="options-button"
              className="btn btn btn-light border ms-3 float-end"
            >
              <BsThreeDotsVertical className="position-relative mb-1" />
            </button>

            <div id="quiz-published" className="float-end ms-3 py-2">
              <RiForbidLine className="position-relative me-1 mb-1 text-muted" />
              <span className="text-muted">Not Published</span>
            </div>

            <div id="quiz-points" className="float-end py-2">
              Points {points}
            </div>
          </div>
        </div>
        <hr />
        <EditorNavigation pathname={pathname} />

        {/* Title */}
        <div className="row mt-3 mb-3">
          <div className="col">
            <input
              id="quiz-name"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Description */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="quiz-description" className="form-label">
              <b>Quiz Instructions</b>
            </label>
            <Editor
              id="quiz-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Quiz Type */}
        <div className="row justify-content-end">
          <div className="col-md-11">
            <div className="form-group row mb-3">
              <label
                htmlFor="wd-quiz-type"
                className="col-sm-3 col-form-label"
                style={{ textAlign: "right" }}
              >
                Quiz Type
              </label>
              <div className="col-sm-9">
                <select
                  className="form-select"
                  id="wd-quiz-type"
                  value={quizType}
                  onChange={(e) => setQuizType(e.target.value)}
                >
                  <option value="Graded Quiz">Graded Quiz</option>
                  <option value="Practice Quiz">Practice Quiz</option>
                  <option value="Graded Survey">Graded Survey</option>
                  <option value="Ungraded Survey">Ungraded Survey</option>
                </select>
              </div>
            </div>

            {/* Points */}
            <div className="form-group row mb-3">
              <label
                htmlFor="wd-quiz-points"
                className="col-sm-3 col-form-label"
                style={{ textAlign: "right" }}
              >
                Points
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="wd-quiz-points"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                />
              </div>
            </div>

            {/* Assignment Group */}
            <div className="form-group row mb-3 justify-content-end">
              <label
                htmlFor="wd-assignment-group"
                className="col-sm-3 col-form-label"
                style={{ textAlign: "right" }}
              >
                Assignment Group
              </label>
              <div className="col-sm-9 position-relative">
                <select
                  className="form-select"
                  id="wd-assignment-group"
                  value={assignmentGroup}
                  onChange={(e) => setAssignmentGroup(e.target.value)}
                >
                  <option value="Quizzes">Quizzes</option>
                  <option value="Exams">Exams</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Project">Project</option>
                </select>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label
                htmlFor="wd-quiz-options"
                className="col-sm-3 col-form-label"
                style={{ textAlign: "right" }}
              >
                Options
              </label>
              <div className="col-sm-9 row align-items-center">
                {/* Shuffle Answers  */}
                <div className="row mb-3">
                  <label
                    htmlFor="wd-quiz-shuffle-answers"
                    className="col-sm-5 col-form-label"
                  >
                    Shuffle Answers
                  </label>
                  <div className="col-sm-4 position-relative">
                    <select
                      className="form-select"
                      id="wd-quiz-shuffle-answers"
                      value={isShuffleAnswers}
                      onChange={(e) => setIsShuffleAnswers(e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                {/* Show Correct Answers */}
                <div className="row mb-3">
                  <label
                    htmlFor="wd-show-correct-answers"
                    className="col-sm-5 col-form-label"
                  >
                    Show Correct Answers
                  </label>
                  <div className="col-sm-4 position-relative">
                    <select
                      className="form-select"
                      id="wd-show-correct-answers"
                      value={showCorrectAnswers}
                      onChange={(e) => setShowCorrectAnswers(e.target.value)}
                    >
                      <option value="Immediately">Immediately</option>
                      <option value="After due">After due</option>
                      <option value="Never">Never</option>
                    </select>
                  </div>
                </div>

                {/* One Question at a Time */}
                <div className="row mb-3">
                  <label
                    htmlFor="wd-one-question-at-a-time"
                    className="col-sm-5 col-form-label"
                  >
                    One Question at a Time
                  </label>
                  <div className="col-sm-4 position-relative">
                    <select
                      className="form-select"
                      id="wd-one-question-at-a-time"
                      value={isOneQuestionAtATime}
                      onChange={(e) => setIsOneQuestionAtATime(e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                {/* Webcam Required */}
                <div className="row mb-3">
                  <label
                    htmlFor="wd-webcam-required"
                    className="col-sm-5 col-form-label"
                  >
                    Webcam Required
                  </label>
                  <div className="col-sm-4 position-relative">
                    <select
                      className="form-select"
                      id="wd-webcam-required"
                      value={isWebcamRequired}
                      onChange={(e) => setIsWebcamRequired(e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                {/* Lock Questions After Answering */}
                <div className="row mb-3">
                  <label
                    htmlFor="wd-lock-questions-after-answering"
                    className="col-sm-5 col-form-label"
                  >
                    Lock Questions After Answering
                  </label>
                  <div className="col-sm-4 position-relative">
                    <select
                      className="form-select"
                      id="wd-lock-questions-after-answering"
                      value={isLockQuestionsAfterAnswering}
                      onChange={(e) =>
                        setIsLockQuestionsAfterAnswering(e.target.value)
                      }
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                {/* Time Limit */}
                <div className="row mb-3">
                  <label
                    htmlFor="wd-quiz-time-limit"
                    className="col-sm-3 col-form-label"
                  >
                    Time Limit
                  </label>
                  <div className="col-sm-3">
                    <select
                      className="form-select"
                      id="wd-quiz-time-limit"
                      value={isTimeLimit}
                      onChange={(e) => setIsTimeLimit(e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {isTimeLimit === "Yes" && (
                    <div className="col-sm-4">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control ms-2 "
                          placeholder="Enter number"
                          value={howLong}
                          onChange={(e) => setHowLong(e.target.value)}
                        />
                        <span className="input-group-text">mins</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Multiple Attempts */}
                <div className="row mb-3">
                  <label
                    htmlFor="wd-quiz-multiple-attempts"
                    className="col-sm-3 col-form-label"
                  >
                    Mutiple Attempts
                  </label>
                  <div className="col-sm-3">
                    <select
                      className="form-select"
                      id="wd-quiz-multiple-attempts"
                      value={isMutipleAttempts}
                      onChange={(e) => setIsMutipleAttempts(e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {isMutipleAttempts === "Yes" && (
                    <div className="col-sm-4">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control ms-2"
                          placeholder="Enter number"
                          value={howManyAttempts}
                          onChange={(e) => setHowManyAttempts(e.target.value)}
                        />
                        <span className="input-group-text">times</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Access Code */}
                <div className="row mb-3">
                  <label
                    htmlFor="wd-quiz-access-code"
                    className="col-sm-3 col-form-label"
                  >
                    Access Code
                  </label>
                  <div className="col-sm-3">
                    <select
                      className="form-select"
                      id="wd-quiz-access-code"
                      value={isAccessCode}
                      onChange={(e) => setIsAccessCode(e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {isAccessCode === "Yes" && (
                    <div className="col-sm-4">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control ms-2 "
                          placeholder="Enter number"
                          value={accessCodeNumber}
                          onChange={(e) => setAccessCodeNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group row">
              <label
                htmlFor="wd-quiz-assign-to"
                className="col-sm-3 col-form-label"
                style={{ textAlign: "right" }}
              >
                Assign
              </label>
              <div className="col-sm-9">
                <div className="border rounded p-3 mb-3">
                  <div className="form-group mb-2">
                    <label
                      htmlFor="wd-quiz-assign-to"
                      style={{ fontWeight: "bold" }}
                    >
                      Assign to
                    </label>
                    <div className="input-group">
                      <span className="form-control" id="wd-quiz-assign-to">
                        Everyone <RxCross2 />
                      </span>
                    </div>
                  </div>

                  {/* Due date */}
                  <div className="form-group mb-2">
                    <label
                      htmlFor="wd-quiz-due-date"
                      style={{ fontWeight: "bold" }}
                    >
                      Due
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="wd-quiz-due-date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>

                  {/* Available date */}
                  <div className="form-group row mb-2">
                    <div className="col-sm-6 d-flex flex-column justify-content-center">
                      <label
                        htmlFor="wd-quiz-available-from"
                        className="col-sm-6 col-form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Available from
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="wd-quiz-available-from"
                        value={availableDate}
                        onChange={(e) => setAvailableDate(e.target.value)}
                      />
                    </div>

                    {/* Until date */}
                    <div className="col-sm-6 d-flex flex-column justify-content-center">
                      <label
                        htmlFor="wd-quiz-available-until"
                        className="col-sm-6 col-form-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Until
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="wd-quiz-available-until"
                        value={availableUntil}
                        onChange={(e) => setAvailableUntil(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
            <button type="button" className="btn btn-light border me-2">
              Cancel
            </button>
          </Link>

          <button type="submit" className="btn btn-danger me-2">
            Save
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={handleSaveAndPublish}
          >
            Save and Publish
          </button>
        </div>
      </div>
    </form>
  );
}
