import { useState, useEffect } from "react";
import { formatDatetimeForPostgres } from "../../utils/formatDatetimeForPostgres";

//api call for study plans are going to be in here for now but will be moved to homepage later?

export default function StudyPlans({ task, startDatetime, endDatetime }) {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    //this is for the countdown
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

  return (
    <div className="study-plan">
      <h3>{task}</h3>
      {/* <p>Start: {formatDatetimeForPostgres(startDatetime)}</p>
      <p>End: {formatDatetimeForPostgres(endDatetime)}</p> */}
      <p>Start: {new Date(startDatetime).toLocaleString()}</p>
      <p>End: {new Date(endDatetime).toLocaleString()}</p>
      <p>Remaining Time: {remainingTime}</p>
    </div>
  );
}
