import { useState } from "react";
import { postStudyPlan } from "../../utils/studyPlansApi";
import { formatDatetimeForPostgres } from "../../utils/formatDatetimeForPostgres";

export default function MakeStudyPlan({ tasks, setTasks }) {
  const [task, setTask] = useState("");
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");

  const study_plan_id = new Date();
  const input = {
    task: task,
    startDatetime: formatDatetimeForPostgres(startDatetime),
    endDatetime: formatDatetimeForPostgres(endDatetime),
  };
  console.log(input, "<--- input within make study plan");
  const handleSubmit = (e) => {
    e.preventDefault();
    setTask("");
    setStartDatetime("");
    setEndDatetime("");
    const newStudyPlan = { ...input, study_plan_id };
    setTasks([newStudyPlan, ...tasks]);
    postStudyPlan(input);
  };

  return (
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
  );
}
