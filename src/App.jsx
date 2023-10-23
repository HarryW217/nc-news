// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ArticleList } from "../components/ArticleList";

const App = () => {
  return (
    <div className="App">
      <h1 className="website-header">NC NEWS</h1>
      <Routes>
        <Route path="/" element={<ArticleList/>}/>
      </Routes>
    </div>
  );
};

export default App;
