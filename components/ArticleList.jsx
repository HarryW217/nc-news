import { useState, useEffect } from "react";
import axios from "axios";
import { ArticleCard } from "./ArticleCard";

export const ArticleList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState("");
  const [topicQuery, setTopicQuery] = useState("");

  //Get requests
  const getArticles = () => {
    return axios
      .get(`https://api-news-zhvd.onrender.com/api/articles${topicQuery}`)
      .then(({ data }) => {
        return data;
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
    setCurrentTopic(slug);
    setTopicQuery("?topic=" + slug);
  };

  const handleViewAll = () => {
    setCurrentTopic("");
    setTopicQuery("");
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
  }, [topicQuery]);

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
      {currentTopic !== "" ? (
        <h2>{currentTopic} articles</h2>
      ) : (
        <h2> all articles</h2>
      )}
      {articles.map((article, key) => {
        return <ArticleCard article={article} key={key} />;
      })}
    </section>
  );
};
