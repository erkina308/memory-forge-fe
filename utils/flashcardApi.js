import memoryForgeApi from "./token";
import { jwtDecode } from "jwt-decode";

//fetch flashcards from db

export const fetchFlashcards = async (topic) => {
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
    let url = `/${user_id}/flashcards`;
    if (topic) {
      url += `?topic=${encodeURIComponent(topic)}`;
    }
    const res = await memoryForgeApi.get(url);
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

//search flashcards from db

export const searchFlashcard = async (query) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found. User not logged in");
    return;
  }
  const decodedToken = jwtDecode(token);
  const user_id = decodedToken.userId;
  console.log(query, "<--within api");
  try {
    let url = `/${user_id}/flashcards`;
    if (query) {
      url += `/search?query=${encodeURIComponent(query)}`;
    }
    const res = await memoryForgeApi.get(url);
    const { flashcards } = res.data;
    return flashcards;
  } catch (err) {
    console.error("Error:", err);
  }
};
