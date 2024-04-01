import memoryForgeApi from "./token";
import { jwtDecode } from "jwt-decode";

//fetch flashcards from db

export const fetchFlashcards = async () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found. User is not logged in.");
    return; // Handle unauthenticated user
  }

  // Decode the token to obtain its payload
  const decodedToken = jwtDecode(token);

  // Extract the user_id from the decoded token
  const user_id = decodedToken.userId;

  try {
    const res = await memoryForgeApi.get(`/${user_id}/flashcards`);
    const { flashcards } = res.data;
    return flashcards;
  } catch (err) {
    console.error("Error:", err);
  }
};

//post flashcard to db
export const postFlashcard = async (input) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found. User is not logged in.");
    return; // Handle unauthenticated user
  }

  // Decode the token to obtain its payload
  const decodedToken = jwtDecode(token);

  // Extract the user_id from the decoded token
  const user_id = decodedToken.userId;

  try {
    const res = await memoryForgeApi.post(`/${user_id}/flashcards`, {
      question: input.question,
      answer: input.answer,
      topic: input.topic,
    });
    const { flashcard } = res.data;
    return flashcard;
  } catch (err) {
    console.error("Error:", err);
  }
};
