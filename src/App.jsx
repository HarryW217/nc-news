import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ArticleList } from "../components/ArticleList";
import { SingleArticle } from "../components/SingleArticle";
import { CommentCard } from "../components/CommentCard";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <div className="App">
      <Helmet>
        <title>NC NEWS</title>
      </Helmet>
      <h1 className="website-header">NC NEWS</h1>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/comment/:comment_id" element={<CommentCard />} />
      </Routes>
      <footer>Developed by Harry Walker. 2023.</footer>
    </div>
  );
};

export default App;
