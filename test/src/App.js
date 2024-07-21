import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Login from "./Login";
import Layout from "./layout";
import Board from "./board";
import Signin from "./Signin";

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
              </Layout>}/>
        </Routes>
      </div>
    </div>
  );
}
export default App;
