import { useState } from "react";
import { postStudyPlan } from "../../utils/studyPlansApi";
import { formatDatetimeForPostgres } from "../../utils/formatDatetimeForPostgres";
import { useNavigate } from "react-router-dom";

export default function MakeStudyPlan() {
  const [task, setTask] = useState("");
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [taskMade, setTaskMade] = useState(false);
  const navigate = useNavigate();

  const input = {
    task: task,
    startDatetime: formatDatetimeForPostgres(startDatetime),
    endDatetime: formatDatetimeForPostgres(endDatetime),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTaskMade(true);
    setTask("");
    setStartDatetime("");
    setEndDatetime("");
    postStudyPlan(input);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTask">
          Task:
          <input
            name="newTask"
            id="newTask"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </label>
        <label htmlFor="newStartdate">
          Start Date:
          <input
            name="newStartdate"
            id="newStartdate"
            type="datetime-local"
            value={startDatetime}
            onChange={(e) => setStartDatetime(e.target.value)}
            required
          />
        </label>
        <label htmlFor="newEnddate">
          End Date:
          <input
            name="newEnddate"
            id="newEnddate"
            type="datetime-local"
            value={endDatetime}
            onChange={(e) => setEndDatetime(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Study Plan</button>
      </form>
      {taskMade ? <p>New task made successfully</p> : <></>}

      <button
        onClick={() => {
          navigate("/tasks");
        }}
      >
        Return to study plans
      </button>
    </section>
  );
}
