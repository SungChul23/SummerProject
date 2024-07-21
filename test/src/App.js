import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Login";
import Layout from "./layout";
import Board from "./board";
<<<<<<< HEAD
import Write from "./write";
=======
import Signin from "./Signin";
>>>>>>> f87c527e1b068160ec9797682932b8ca87a440e8

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
<<<<<<< HEAD
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
=======
            path="/login"
>>>>>>> f87c527e1b068160ec9797682932b8ca87a440e8
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
