import axios from "axios";
import { useState } from "react";


export const CommentCard = ({ comment }) => {

  const [isDeleted, setIsDeleted] = useState(false)
  const [error,setError]=useState(null)

  //Date and Time variables
  const date = new Date(comment.created_at);
  const time = date.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const year = date.getFullYear()

  const deleteComment = () => {
    return axios.delete(`https://api-news-zhvd.onrender.com/api/comments/${comment.comment_id}`)
      .catch((err) => {
        setIsDeleted(false)
        setError(err)
    })
  }

  const handleDelete = () => {
    setIsDeleted(true)
    deleteComment()
  }

  if (error && error.message === "Network Error") {
    return <p>Warning! We cannot delete your comment as your
      interet connection is unstable. Please try again later.
    </p>
  }

  if (isDeleted) {
    return <p>Your comment was successfully deleted</p>
  }
  
  return (
    <article className="comment-card">
      <h2 className="comment-author">{comment.author}:</h2>
      <p className="comment-text">{comment.body}</p>
      <p className="votes-and-created-at">
        Votes: {comment.votes} | Posted: {time}, {date.toDateString()}
      </p>
      {year >= 2023 ? <button onClick={handleDelete}>Delete Comment</button>:null}
    </article>
  );
};
