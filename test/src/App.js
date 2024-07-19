import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes instead of Switch
import Head from './Header'; // Header 컴포넌트를 import하세요
import Login from './Login'; //로그인.js 임포트

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact Component={Head}/>
        <Route path="/login" Component={Login}/>
      </Routes>
    </Router>
  );
}

export default App;
