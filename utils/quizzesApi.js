import memoryForgeApi from "./token";
import { jwtDecode } from "jwt-decode";

//fetch quizzes from db

export const fetchQuizzes = async () => {
  //fetch token from local storage
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found, User is not logged in");
    return; //handle unauthenticated user
  }

  const decodedToken = jwtDecode(token); //decode the token to obtain payload

  const user_id = decodedToken.userId; //extract user id from decoded token

  try {
    const res = await memoryForgeApi.get(`/${user_id}/quizzes`);
    const { quizzes } = res.data;
    return quizzes;
  } catch (err) {
    console.error("Error:", err);
  }
};

//post quiz to db

//patch quiz in db
export const patchQuiz = async (quiz_id, input) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found, User is not logged in");
    return;
  }

  const decodedToken = jwtDecode(token);

  const user_id = decodedToken.userId;

  try {
    const res = await memoryForgeApi.patch(`/${user_id}/quizzes/${quiz_id}`, {
      question: input.question,
      choices: input.choices,
      correct_answer: input.correct_answer,
    });
    return res.data.quiz[0];
  } catch (err) {
    console.error("Error:", err);
  }
};
