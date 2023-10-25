import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CommentCard } from "./CommentCard";

export const CommentList = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  const getComments = (articleId) => {
    return axios
      .get(
        `https://api-news-zhvd.onrender.com/api/articles/${articleId}/comments`
      )
      .then(({ data }) => {
        return data;
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.response.data.msg}</p>;

  if (comments.length === 0) {
    return (
      <section className="comment-list">
        <h2 className="comments-title">COMMENTS:</h2>
        <h3>This post has no comments!</h3>
      </section>
    );
  }

  return (
    <section className="comment-list">
      <h2 className="comments-title">COMMENTS:</h2>
      {comments.map((comment, key) => {
        return <CommentCard comment={comment} key={key} />;
      })}
    </section>
  );
};
