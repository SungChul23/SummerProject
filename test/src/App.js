import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

import Login from "./Login";
import Layout from "./layout";
import Board from "./board";

import Write from "./write";
import Signin from "./Signin";
import Mypage from "./Mypage";

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
            path="/login"
            element={
              <Layout>
                {" "}
                <Login />{" "}
              </Layout>
            }
          />
          <Route
            path="/signin"
            element={
              <Layout>
                {" "}
                <Signin />{" "}
              </Layout>
            }
          />
          <Route
            path="/mypage"
            element={
              <Layout>
                {" "}
                <Mypage />{" "}
              </Layout>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
export default App;
