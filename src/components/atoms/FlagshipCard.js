
import React from "react";

const FlagshipCard = ({ heading, problem, solution, impact, img, links, date, tags }) => {
  return (
    <div className="card">
      <div className="image-container">
        <img src={img} alt={heading}></img>
      </div>
      <div className="content">
        <h1 className="header">{heading}</h1>
        <p className="date">{date}</p>
        <div className="project-details">
          <h2>What was the problem?</h2>
          <p>{problem}</p>
          <h2>What did I do?</h2>
          <p>{solution}</p>
          <h2>What was the impact?</h2>
          <p>{impact}</p>
        </div>
        <div className="tags">
          {tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="links">
          {links.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlagshipCard;
