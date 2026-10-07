
import React, { useState } from "react";

// "2026-08-27" -> "Aug 2026"
const formatDate = value => {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
};

const FlagshipCard = ({
  heading,
  subtitle,
  summary,
  problem,
  solution,
  impact,
  img,
  venue,
  links,
  date,
  tags,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="card flagship">
      <div className="image-container">
        <img src={img} alt={heading}></img>
      </div>

      <div className="content">
        {venue && (
          <div className="venue">
            {venue.logo ? (
              // Publisher's own masthead, which already carries the journal name.
              <img
                className="venue-logo"
                src={venue.logo}
                alt={venue.name}
                style={venue.logoHeight ? { height: `${venue.logoHeight}px` } : undefined}
              />
            ) : (
              <>
                <img src={venue.icon} alt="" aria-hidden="true" />
                <span>{venue.name}</span>
              </>
            )}
            {date && <span className="venue-date">{formatDate(date)}</span>}
          </div>
        )}

        <h1 className="header">{heading}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
        {summary && <p className="summary">{summary}</p>}

        {(problem || solution || impact) && (
          <>
            <button
              type="button"
              className="read-more"
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              {open ? "Show less" : "Read more"}
            </button>

            {open && (
              <div className="project-details">
                {problem && (
                  <>
                    <h2>What was the problem?</h2>
                    <p>{problem}</p>
                  </>
                )}
                {solution && (
                  <>
                    <h2>What did I do?</h2>
                    <p>{solution}</p>
                  </>
                )}
                {impact && (
                  <>
                    <h2>What was the impact?</h2>
                    <p>{impact}</p>
                  </>
                )}
              </div>
            )}
          </>
        )}

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
