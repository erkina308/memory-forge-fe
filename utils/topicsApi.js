import memoryForgeApi from "./token";
// import { jwtDecode } from "jwt-decode";

//fetch topics from database

export const fetchAllTopics = async () => {
  // const token = localStorage.getItem("token");

  // if (!token) {
  //   console.error("Token not found, User not logged in");
  //   return;
  // }

  // const decodedToken = jwtDecode(token);
  // const user_id = decodedToken.userId;

  try {
    const res = await memoryForgeApi.get(`/topics`);
    const { topics } = res.data;
    return topics;
  } catch (err) {
    console.error("Error:", err);
  }
};
