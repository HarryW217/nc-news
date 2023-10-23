export const ArticleCard = ({ article }) => {
  return (
    <article className="article-card">
      <h2 className="article-card-title">{article.title}</h2>
      <img src={article.article_img_url}></img>
      <h3>Author: {article.author}</h3>
      <h3>Topic: {article.topic}</h3>
      <h3>Votes: {article.votes}</h3>
    </article>
  );
};
