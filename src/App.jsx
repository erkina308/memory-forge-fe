import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../authentication/PrivateRoute";
// import Register from "./pages/authPages/Register";
import Login from "./pages/authPages/Login";
import Dashboard from "./pages/Dashboard";
import Flashcards from "./pages/Flashcards";
import FlashcardRevision from "./pages/FlashcardRevision";
import Homepage from "./pages/Homepage";
import Quizzes from "./pages/Quizzes";
import ViewQuiz from "./pages/ViewQuiz";
import EditQuiz from "./pages/EditQuiz";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <Fragment>
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

        {/* Quiz routes */}

        <Route
          path="/quizzes"
          element={
            <PrivateRoute>
              <Quizzes />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/quizzes/quiz"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        /> */}
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
        <Route
          path="/quizzes/test"
          element={
            <PrivateRoute>
              <TestPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
