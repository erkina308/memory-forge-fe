import "./App.css";
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Redirect to login if user tries to access private routes without authentication */}
      </Routes>
    </Fragment>
  );
}

export default App;
