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
import StudyPlans from "./pages/StudyPlans";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);

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
                <StudyPlans />
              </PrivateRoute>
            }
          />
        </Routes>
      </TopicContext.Provider>
    </Fragment>
  );
}

export default App;
