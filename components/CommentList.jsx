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

  const postComment = (e) => {
    e.preventDefault();
    setIsLoading(true);
    return axios
      .post(
        `https://api-news-zhvd.onrender.com/api/articles/${article_id}/comments`,
        {
          username: "tickle122",
          body: e.target[0].value,
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
          <p className="signed-in-as-text">Signed in as: tickle122</p>
          <label>Your Comment</label>
          <input type="text" required></input>
          <button>Post</button>
        </form>
        {isLoading ? <p>Please wait while your comment is posting...</p> : null}
        {error && error.message === "Network Error" ? (
          <p>
            {" "}
            Sorry! You cannot post due to an unstable connection. Please try
            again later.
          </p>
        ) : null}
      </div>
      {comments.length === 0 ? (
        <h3 className="no-comment-text">This post has no comments</h3>
      ) : (
        comments.map((comment, key) => {
          return <CommentCard comment={comment} key={key} />;
        })
      )}
    </section>
  );
};
