import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Login";
import Layout from "./layout";
import Board from "./board";
import Write from "./write";

function App() {
  return (
    <div className="wrapper">
      <div className="contentWrapper">
        {/* Remove this nested Router */}
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                {" "}
                <Board />{" "}
              </Layout>
            }
          />
          <Route
            path="/write"
            element={
              <Layout>
                {" "}
                <Write />{" "}
              </Layout>
            }
          />
          <Route
            path="/Login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
export default App;
