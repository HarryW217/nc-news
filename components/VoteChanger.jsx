import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const VoteChanger = ({ article }) => {
  const [error, setError] = useState(null);
  const [userVotes, setUserVotes] = useState(0);
  const { article_id } = useParams();

  const updateVotes = (votes) => {
    return axios
      .patch(`https://api-news-zhvd.onrender.com/api/articles/${article_id}`, {
        inc_votes: votes,
      })
      .catch((err) => {
        setError(err);
        setUserVotes(0);
      });
  };

  useEffect(() => {
    updateVotes(userVotes);
  }, [userVotes]);

  return (
    <div>
      <h2>Votes:{article.votes + userVotes}</h2>
      <button
        disabled={userVotes === 1}
        onClick={() => {
          setUserVotes((currentVotes) => {
            if (error) {
              return 0;
            } else {
              return currentVotes + 1;
            }
          });
        }}
      >
        Up-vote
      </button>
      <button
        disabled={userVotes === -1}
        onClick={() => {
          setUserVotes((currentVotes) => {
            if (error) {
              return 0;
            } else {
              return currentVotes - 1;
            }
          });
        }}
      >
        Down-vote
      </button>
      {error && error.message === "Network Error" ? (
        <p>
          Sorry! You cannot vote due to an unstable connection. Please try again
          later.
        </p>
      ) : null}
    </div>
  );
};
