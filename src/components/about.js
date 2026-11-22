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
            {data.fellowship && (
              <div className="fellowship">
                <span className="fellowship-mark" aria-hidden="true">
                  &#9733;
                </span>
                <div>
                  <strong>{data.fellowship.title}</strong>
                  <span>{data.fellowship.detail}</span>
                </div>
              </div>
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
