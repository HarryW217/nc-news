export const CommentCard = ({ comment }) => {
  return (
    <article className="comment-card">
      <h2 className="comment-author">{comment.author}:</h2>
      <p className="comment-text">{comment.body}</p>
      <p className="votes-and-created-at">
        Votes: {comment.votes} | Posted: {comment.created_at}
      </p>
    </article>
  );
};
