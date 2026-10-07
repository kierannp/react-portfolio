import React from "react"
import Fade from "react-reveal/Fade"
import data from "../yourdata"

const Header = () => {
  return (
    <div className="section" id="home">
      <div className="container">
        <div className="header-wrapper">
          <Fade bottom>
            <div className="arwinLogo">
              <img src={data.navLogo}></img>
            </div>
          </Fade>
          <Fade bottom>
            <h2>
              Hi, I'm {data.name}{" "}
              <span role="img" aria-label="Emoji">
                👋
              </span>
            </h2>
          </Fade>
          <Fade bottom cascade>
            <div className="heading-wrapper">
              <h1>
                {data.headerTagline[0]}
              </h1>
              <h1>
                {" "}
                {data.headerTagline[1]}
              </h1>
            </div>
          </Fade>
          <Fade bottom>
            <p>
              {data.headerParagraph.map((line, i) => (
                <React.Fragment key={line}>
                  {i > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </p>
          </Fade>
          <Fade bottom>
            <div className="header-btns">
              <a
                href={`mailto:${data.contactEmail}`}
                className="primary-btn"
              >
                Send me an email
              </a>
              <a
                href={data.cvLink}
                className="secondary-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  )
}

export default Header
