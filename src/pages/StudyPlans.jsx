import { useState, useEffect } from "react";
import { deleteStudyPlan } from "../../utils/studyPlansApi";
import timeToSeconds from "../../utils/timeToSecond";

//api call for study plans are going to be in here for now but will be moved to homepage later?

export default function StudyPlans({
  task,
  startDatetime,
  endDatetime,
  taskId,
  studyPlans,
  setStudyPlans,
}) {
  const [remainingTime, setRemainingTime] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endTime = new Date(endDatetime);
      const diff = endTime - now;

      if (diff <= 0) {
        setRemainingTime("Expired");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDatetime]);

  // console.log(typeof remainingTime, "<-- what is this");
  const sortedRemainingTime = [...remainingTime];
  sortedRemainingTime.sort((a, b) => {
    const aSeconds = timeToSeconds(a);
    const bSeconds = timeToSeconds(b);
    return aSeconds - bSeconds;
  });
  function confirmDeleteModal() {
    setShowConfirmation(true);
  }
  function cancelDeleteModal() {
    setShowConfirmation(false);
  }
  function handleTaskDelete(e, taskId) {
    e.preventDefault();
    const newTaskList = studyPlans.filter((task) => {
      return task.study_plan_id !== taskId;
    });
    setStudyPlans(newTaskList);
    deleteStudyPlan(taskId);
    setIsDeleted(true);
    setShowConfirmation(false);
    setTimeout(() => {
      setIsDeleted(false);
    }, 2000);
  }

  return (
    <div className="study-plan">
      <h2>{task}</h2>
      <p>
        <strong>Start:</strong> {new Date(startDatetime).toLocaleString()}
      </p>
      <p>
        <strong>End:</strong> {new Date(endDatetime).toLocaleString()}
      </p>
      <p>
        <strong>Remaining Time:</strong> {sortedRemainingTime}
      </p>
      <button
        onClick={(e) => {
          setTaskToDeleteId(taskId);
          confirmDeleteModal();
        }}
      >
        Delete
      </button>
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={(e) => handleTaskDelete(e, taskId)}>Yes</button>
          <button onClick={cancelDeleteModal}>Cancel</button>
        </div>
      )}
      {isDeleted ? <p>Item deleted</p> : <></>}
    </div>
  );
}
