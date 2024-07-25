import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Login";
import Layout from "./layout";
import Board from "./board";

import Write from "./write";
import Signin from "./Signin";
import Book from "./book";

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
                <Login />
              </Layout>
            }
          />
          <Route
            path="/signin"
            element={
              <Layout>
                <Signin />
              </Layout>
            }
          />
          <Route
            path="/book"
            element={
              <Layout>
                <Book />
              </Layout>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
export default App;
