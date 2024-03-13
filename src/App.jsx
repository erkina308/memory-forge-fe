import "./App.css";
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../authentication/PrivateRoute";
// import Register from "./pages/authPages/Register";
import Login from "./pages/authPages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Fragment>
      <Routes>
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
        {/* Redirect to login if user tries to access private routes without authentication */}
        <Route
          path="/api/:user/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
