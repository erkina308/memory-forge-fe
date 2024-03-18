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
          path="/quizzes"
          element={
            <PrivateRoute>
              <Quizzes />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/view-quiz"
          element={
            <PrivateRoute>
              <ViewQuiz />
            </PrivateRoute>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
