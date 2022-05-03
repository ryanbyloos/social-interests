import React from "react";
import './App.css';
import Home from './components/home/home';
import Login from './components/login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} >
            <Route path=":Id" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<p>There is nothing here !</p>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;