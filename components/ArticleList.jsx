import { useState, useEffect } from "react";
import axios from "axios";
import { ArticleCard } from "./ArticleCard";

export const ArticleList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    return axios
      .get(`https://api-news-zhvd.onrender.com/api/articles`)
      .then(({ data }) => {
        return data;
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        {error.status}
        {error.msg}
      </p>
    );

  return (
    <section className="articles-list">
      {articles.map((article, key) => {
        return <ArticleCard article={article} key={key} />;
      })}
    </section>
  );
};
