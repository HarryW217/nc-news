import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CommentCard } from "./CommentCard";

export const CommentList = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  const [commentBody, setCommentBody] = useState("");

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
  }, [article_id, commentBody]);

  if (isLoading) return <p>Loading...</p>;
  if (error) { 
    return <p>{error.msg}</p>;
    //Not sure what I am doing with my error handling!
  } 

  if (comments.length === 0) {
    return (
      <section className="comment-list">
        <h2 className="comments-title">COMMENTS:</h2>
        <h3>This post has no comments!</h3>
      </section>
    );
  }

  const postComment = (e) => {
    e.preventDefault();
    setIsLoading(true);
    return axios
      .post(
        `https://api-news-zhvd.onrender.com/api/articles/${article_id}/comments`, {
          username: "tickle122",
          body:e.target[0].value,
        }
      )
      .then(({ data }) => {
        setIsLoading(false);
        setCommentBody(data.comment);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  return (
    <section className="comment-list">
      <h2 className="comments-title">COMMENT SECTION:</h2>
      <div>
        <form onSubmit={postComment}>
          <h2>Have your say... post a comment!</h2>
          <p>Signed in as: tickle122</p>
          <label>Your Comment</label>
          <input type="text"></input>
          <button>Post</button>
        </form>
      </div>
      {comments.map((comment, key) => {
        return <CommentCard comment={comment} key={key} />;
      })}
    </section>
  );
};
