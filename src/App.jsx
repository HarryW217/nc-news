// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ArticleList } from "../components/ArticleList";
import { SingleArticle } from "../components/SingleArticle";

const App = () => {
  return (
    <div className="App">
      <h1 className="website-header">NC NEWS</h1>
      <p className="welcome-message">Welcome! Browse our extensive catalogue of Articles below...</p>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </div>
  );
};

export default App;
