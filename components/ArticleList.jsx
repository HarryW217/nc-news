import { useState } from "react";
import axios from "axios";
import { ArticleCard } from "./ArticleCard";

export const ArticleList = () => {
  //   const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    return axios
      .get(`https://api-news-zhvd.onrender.com/api/articles`)
      .then(({ data }) => {
        return data;
      });
  };

  getArticles()
    .then((articles) => {
      setArticles(articles);
      setError(null);
    })
    .catch((err) => {
      setError(err);
    });

  if (error) return <p>{error.msg}</p>;

  return (
    <section className="articles-list">
      {articles.map((article, key) => {
        return <ArticleCard article={article} key={key} />;
      })}
    </section>
  );
};
