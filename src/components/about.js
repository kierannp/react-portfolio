import React from "react"
import Fade from "react-reveal/Fade"
import data from "../yourdata"

const About = () => {
  return (
    <div className="secion" id="about">
      <div className="container">
        <div className="about-section">
          <div className="content">
            <Fade bottom cascade>
              <h1>About Me</h1>
            </Fade>
            <p>
              {data.aboutParaOne}
              <br></br>
              <br></br>
              {data.aboutParaTwo}
              <br></br>
              <br></br>
              {data.aboutParaThree}
            </p>
            {data.credentials && (
              <ul className="credentials">
                {data.credentials.map(c => (
                  <li key={c.name}>
                    <div className="logo-box">
                      <img
                        src={c.logo}
                        alt={c.name}
                        style={{ height: `${c.height || 40}px` }}
                      />
                    </div>
                    <span>{c.caption}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="image-wrapper">
            <img src={data.aboutImage} alt="Portrait of Kieran Nehil-Puleo"></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
