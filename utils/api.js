import memoryForgeApi from "./token";
import { jwtDecode } from "jwt-decode";

// const token = localStorage.getItem("token");
// console.log(token, "<--- token in api.js");
// const decodedToken = jwtDecode(token);
// console.log(decodedToken, "<--- decodedToken in api.js");
// const user_id = decodedToken.userId;
// console.log(user_id, "<--- user id for fetch");

// export const fetchFlashcards = () => {
//   console.log(user_id, "<--- within the function");
//   return memoryForgeApi
//     .get(`/${user_id}/flashcards`)
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

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
  } catch (error) {
    console.error("Error:", error);
  }
};
