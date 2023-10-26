export const CommentCard = ({ comment }) => {
  //Date and Time variables
  const date = new Date(comment.created_at);
  const time = date.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="comment-card">
      <h2 className="comment-author">{comment.author}:</h2>
      <p className="comment-text">{comment.body}</p>
      <p className="votes-and-created-at">
        Votes: {comment.votes} | Posted: {time}, {date.toDateString()}
      </p>
    </article>
  );
};
