// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ArticleList } from "../components/ArticleList";
import { SingleArticle } from "../components/SingleArticle";

const App = () => {
  return (
    <div className="App">
      <h1 className="website-header">NC NEWS</h1>
      <Routes>
        <Route path="/" element={<ArticleList/>}/>
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
      <footer>Developed by Harry Walker. 2023.</footer>
    </div>

  );
};

export default App;
