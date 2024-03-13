import memoryForgeApi from "./token";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");
const decodedToken = jwt_decode(token);
const user_id = decodedToken.userId;

export const fetchFlashcards = () => {
  return memoryForgeApi
    .get(`/${user_id}/flashcards`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
