import memoryForgeApi from "./token";
import { jwtDecode } from "jwt-decode";

//fetch all study plans from database
export const fetchStudyPlans = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found, User not logged in");
    return;
  }

  const decodedToken = jwtDecode(token);

  const user_id = decodedToken.userId;

  try {
    const res = await memoryForgeApi.get(`/${user_id}/study-plans`);
    const { study_plans } = res.data;
    return study_plans;
  } catch (err) {
    console.error("Error:", err);
  }
};

//post a study plan
export const postStudyPlan = async (input) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found, User not logged in");
    return;
  }

  const decodedToken = jwtDecode(token);

  const user_id = decodedToken.userId;

  try {
    const res = await memoryForgeApi.post(`/${user_id}/study-plans`, {
      task: input.task,
      start_datetime: input.startDatetime,
      end_datetime: input.endDatetime,
    });

    const { study_plan } = res.data;
    return study_plan;
  } catch (err) {
    console.error("Error:", err);
  }
};
