import axios from "axios";

const memoryForgeTopicApi = axios.create({
  baseURL: "https://memory-forge-be.onrender.com",
});

//fetch topics from database

export const fetchAllTopics = async () => {
  try {
    const res = await memoryForgeTopicApi.get(`/topics`);
    const { topics } = res.data;
    return topics;
  } catch (err) {
    console.error("Error:", err);
  }
};
