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
  const [isTopicDropdownOpen, setTopicDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);

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

  const toggleTopicDropdown = () => {
    setTopicDropdownOpen(!isTopicDropdownOpen);
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(!isSortDropdownOpen);
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

  if (isLoading)
    return (
      <p className="loading-text">
        Please wait while we fetch your articles. This may take a few moments...
      </p>
    );

  return (
    <section className="articles-list">
      <p className="welcome-message">
        Welcome! Browse our extensive catalogue of Articles below...
      </p>
      <article className="filter-section">
        {" "}
        <div id="header-and-toggle">
          {" "}
          {searchParams.toString() ===
          `topic=${searchParams.toString().slice(6)}` ? (
            <h2>
              Current displaying {searchParams.toString().slice(6)} articles
            </h2>
          ) : (
            <h2>Current displaying all articles</h2>
          )}
          <button className="dropdown-toggle" onClick={toggleTopicDropdown}>
            {isTopicDropdownOpen ? "Hide Topics" : "Show Topics"}
          </button>
        </div>
        {isTopicDropdownOpen && (
          <nav id="topic-nav-bar">
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
        )}
      </article>

      <article className="sorting-menu">
        <div id="sorting-header-and-toggle">
          {sortByProperty ? (
            <h2>Sorted by {sortByProperty}</h2>
          ) : (
            <h2>Sorted by date</h2>
          )}
          <button className="sort-dropdown-toggle" onClick={toggleSortDropdown}>
            {isSortDropdownOpen ? "Hide Sort Options" : "Show Sort Options"}
          </button>
        </div>
          {isSortDropdownOpen && (
            <div id="sort-nav-bars">
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
              <h2>
                Order: {isDescending === true ? "Descending" : "Ascending"}
              </h2>
              <button onClick={handleOrderClick}>
                {isDescending === true
                  ? "View in Ascending Order"
                  : "View in Descending Order"}
              </button>
            </div>
          )}
      </article>
      {error && error.message === "Network Error" ? (
        <p className="error-message">
          Sorry! Your internet connection is unstable and we cannot load your
          request. Please try again later!
        </p>
      ) : null}
      {articles.map((article, key) => {
        return <ArticleCard article={article} key={key} />;
      })}
    </section>
  );
};
