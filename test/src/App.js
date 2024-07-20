import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import Board from "./board";
function App() {
  return (
    <div className="wrapper">
      <div className="contentWrapper">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Board />
              </Layout>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
export default App;
