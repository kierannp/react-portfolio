import React from "react"

const Card = ({ heading, paragraph, img, projectLink, date, tags }) => {
  return (
    <div className="card">
      <div className="image-container">
        <img src={img} alt={heading}></img>
      </div>
      <div className="content">
        <h1 className="header">{heading}</h1>
        <p className="date">{date}</p>
        <p className="text">{paragraph}</p>
        <div className="tags">
          {tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={projectLink ? projectLink : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Explore
        </a>
      </div>
    </div>
  )
}

export default Card
