import { useState, useEffect } from "react";
import { fetchStudyPlans } from "../../utils/studyPlansApi";
import StudyPlans from "../pages/StudyPlans";
import Nav from "./Nav";
import MakeStudyPlan from "./MakeStudyPlan";
import Expandable from "./Expandable";
import "../studyPlan.css";
//api call for study plans are going to be in here for now but will be moved to homepage later?

export default function TaskManager() {
  const [studyPlans, setStudyPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudyPlans().then((data) => {
      setStudyPlans(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) <p>Page Loading...</p>;
  return (
    <section id="study-plan-page">
      <Nav />
      <div className="study-plan-container">
        <Expandable text={"Make new study plan"}>
          <MakeStudyPlan tasks={studyPlans} setTasks={setStudyPlans} />
        </Expandable>
        {studyPlans.map((task) => {
          return (
            <StudyPlans
              key={task.study_plan_id}
              task={task.task}
              startDatetime={task.start_datetime}
              endDatetime={task.end_datetime}
            />
          );
        })}
      </div>
    </section>
  );
}
