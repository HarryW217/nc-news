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

  if (error) return <p>{error.msg}</p>;

  return (
    <div>
      <article className="single-article">
        <h2>{article.title}</h2>
        <img src={article.article_img_url}></img>
        <h3>
          Author: {article.author} | Published: {article.created_at}
        </h3>
        <VoteChanger article={article}/>
        <p className="article-body">{article.body}</p>
        <Link className="back-home-link" to="/">
          Click here to go back home
        </Link>
      </article>
      <CommentList></CommentList>
    </div>
  );
};
