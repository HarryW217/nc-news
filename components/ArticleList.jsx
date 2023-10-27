import { useState, useEffect } from "react";
import axios from "axios";
import { ArticleCard } from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

export const ArticleList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sortByProperty, setSortByProperty] = useState("");
  const [isDescending, setIsDescending] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  //Get requests
  const getArticles = () => {
    const query = searchParams.toString();
    return axios
      .get(`https://api-news-zhvd.onrender.com/api/articles?${query}`)
      .then(({ data }) => {
        if (sortByProperty) {
          const sortedArticles = data.sort((a, b) => {
            if (a[sortByProperty] > b[sortByProperty]) {
              return -1;
            }
            if (a[sortByProperty] < b[sortByProperty]) {
              return 1;
            }
            return 0;
          });
          return isDescending === true
            ? sortedArticles
            : sortedArticles.reverse();
        }
        return isDescending ? data : data.reverse();
      });
  };

  const getTopics = () => {
    return axios
      .get(`https://api-news-zhvd.onrender.com/api/topics`)
      .then(({ data }) => {
        return data.topics;
      });
  };

  //Button click handlers
  const handleTopic = (e) => {
    const slug = e.target.value;
    setSearchParams("topic=" + slug);
  };

  const handleViewAll = () => {
    setSearchParams("");
  };

  const handleSortClick = (e) => {
    const property = e.target.value;
    setSortByProperty(property);
  };

  const handleOrderClick = () => {
    if (isDescending === true) {
      setIsDescending(false);
    } else {
      setIsDescending(true);
    }
  };

  //useEffects
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
  }, [searchParams, sortByProperty, isDescending]);

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((topics) => {
        setTopics(topics);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="articles-list">
      <p className="welcome-message">
        Welcome! Browse our extensive catalogue of Articles below...
      </p>
      <article className="filter-section">
        {" "}
        <h2>Filter by topic...</h2>
        <nav>
          <button className="topic-button" onClick={handleViewAll}>
            view all articles
          </button>
          {topics.map((topic, key) => {
            return (
              <button
                key={key}
                className="topic-button"
                onClick={handleTopic}
                value={topic.slug}
              >
                {topic.slug}
              </button>
            );
          })}
        </nav>
        {searchParams.toString() ===
        `topic=${searchParams.toString().slice(6)}` ? (
          <h2>{searchParams.toString().slice(6)} articles</h2>
        ) : (
          <h2>all articles</h2>
        )}
      </article>

      <article className="sorting-menu">
        <h2>Sorted by: {"created_at" || sortByProperty}</h2>
        <h2>Why not sort by...</h2>
        <nav>
          <button
            className="sort-button"
            onClick={handleSortClick}
            value={"created_at"}
          >
            Date
          </button>
          <button
            className="sort-button"
            onClick={handleSortClick}
            value={"comment_count"}
          >
            Comment Count
          </button>
          <button
            className="sort-button"
            onClick={handleSortClick}
            value={"votes"}
          >
            Votes
          </button>
        </nav>
        <h2>Order: {isDescending === true ? "Descending" : "Ascending"}</h2>
        <button onClick={handleOrderClick}>
          {isDescending === true
            ? "View in Ascending Order"
            : "View in Descending Order"}
        </button>
      </article>

      {articles.map((article, key) => {
        return <ArticleCard article={article} key={key} />;
      })}
    </section>
  );
};
