import { Fragment, useState, useEffect } from "react";
import { TopicContext } from "./contexts/TopicContext";
import { Routes, Route } from "react-router-dom";
import { fetchAllTopics } from "../utils/topicsApi";
import PrivateRoute from "../authentication/PrivateRoute";
// import Register from "./pages/authPages/Register";
import Login from "./pages/authPages/Login";
import Dashboard from "./pages/Dashboard";
import Flashcards from "./pages/Flashcards";
import FlashcardRevision from "./pages/FlashcardRevision";
import FlashcardTopicPage from "./pages/FlashcardTopicPage";
import Homepage from "./pages/Homepage";
import Quizzes from "./pages/Quizzes";
import ViewQuiz from "./pages/ViewQuiz";
import EditQuiz from "./pages/EditQuiz";
import Quiz from "./pages/Quiz";
// import StudyPlans from "./pages/StudyPlans";
import TaskManager from "./components/TaskManager";
import NewStudyPlan from "./pages/NewStudyPlan";
import TestPage from "./pages/TestPage";
import SelectedFlash from "./pages/SelectedFlash";
import EditFlashcard from "./pages/EditFlashcard";
import axios from "axios";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      console.log("Token not found in local storage");
      return;
    }

    const checkTokenExpiration = () => {
      const decodedToken = parseJwt(token);
      const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

      // Check if the token is expired or close to expiration (e.g., within 5 minutes)
      if (decodedToken && decodedToken.exp - currentTime < 300) {
        refreshToken();
      }
    };

    const refreshToken = async () => {
      try {
        // Make a request to your backend to refresh the token
        const response = await axios.post(
          "http://localhost:3000/auth/refresh-token",
          null, // No request body
          { headers: { Authorization: `Bearer ${token}` } } // Include token in headers
        );
        const newToken = response.data.token;

        // Update the token in local storage with the key 'token'
        localStorage.setItem("token", newToken); // Use 'token' as the key
        setToken(newToken);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        // Handle token refresh failure (e.g., logout user)
      }
    };

    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    };

    const tokenRefreshInterval = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(tokenRefreshInterval); // Cleanup on unmount
  }, [token]);

  useEffect(() => {
    fetchAllTopics().then((data) => {
      setTopics(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) <p>Page Loading...</p>;
  return (
    <Fragment>
      <TopicContext.Provider value={{ topics }}>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
          {/* Redirect to login if user tries to access private routes without authentication */}

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Flashcard routes */}

          <Route
            path="/flashcards"
            element={
              <PrivateRoute>
                <Flashcards />
              </PrivateRoute>
            }
          />
          <Route
            path="/revision-flashcards"
            element={
              <PrivateRoute>
                <FlashcardRevision />
              </PrivateRoute>
            }
          />

          <Route
            path="/flashcards/topic"
            element={
              <PrivateRoute>
                <FlashcardTopicPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/flashcards/selected-flashcard"
            element={
              <PrivateRoute>
                <SelectedFlash />
              </PrivateRoute>
            }
          />

          <Route
            path="/flashcards/edit-flashcard"
            element={
              <PrivateRoute>
                <EditFlashcard />
              </PrivateRoute>
            }
          />

          {/* Quiz routes */}

          <Route
            path="/quizzes"
            element={
              <PrivateRoute>
                <Quizzes />
              </PrivateRoute>
            }
          />
          <Route
            path="/quizzes/quiz"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/quizzes/view-quizzes"
            element={
              <PrivateRoute>
                <ViewQuiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/quizzes/edit-quiz"
            element={
              <PrivateRoute>
                <EditQuiz />
              </PrivateRoute>
            }
          />

          {/* Study Plans */}

          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskManager />
              </PrivateRoute>
            }
          />

          <Route
            path="/tasks/make-new-task"
            element={
              <PrivateRoute>
                <NewStudyPlan />
              </PrivateRoute>
            }
          />
        </Routes>
      </TopicContext.Provider>
    </Fragment>
  );
}

export default App;
