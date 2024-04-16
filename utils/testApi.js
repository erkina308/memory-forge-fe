import axios from "axios";

export const fetchScienceQs = async () => {
  try {
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium"
    );
    const { results } = res.data;
    return results;
  } catch (error) {
    console.error("Error", error);
  }
};

export const fetchGeoQs = async () => {
  try {
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple"
    );
    const { results } = res.data;
    return results;
  } catch (error) {
    console.error("Error", error);
  }
};
