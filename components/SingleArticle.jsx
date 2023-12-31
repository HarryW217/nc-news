import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CommentList } from "./CommentList";
import { VoteChanger } from "./VoteChanger";

export const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { article_id } = useParams();

  //Date and Time variables
  const date = new Date(article.created_at);
  const time = date.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getArticle = (articleId) => {
    return axios
      .get(`https://api-news-zhvd.onrender.com/api/articles/${articleId}`)
      .then(({ data }) => {
        return data;
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;

  if (error && error.message === "Network Error") return <p>
    Sorry! We cannot load this article as your internet connection is unstable.
    Please try again later.
  </p>
  
  return (
    <div>
      <article className="single-article">
        <Link className="back-home-link" to="/">
          Click here to go back home
        </Link>
        <h2>{article.title}</h2>
        <img src={article.article_img_url}></img>
        <h3 className="author-and-published">
          Author: {article.author} | Published: {time}, {date.toDateString()}
        </h3>
        <VoteChanger article={article} />
        <p className="article-body">{article.body}</p>
      </article>
      <CommentList></CommentList>
    </div>
  );
};
