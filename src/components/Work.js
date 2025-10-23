import React from "react"
import Card from "./atoms/Card"
import Fade from "react-reveal/Fade"

import data from "../yourdata"

const Work = () => {
  return (
    <div className="section" id="work">
      <div className="container">
        <div className="work-wrapper">
          <Fade bottom>
            <h1>Projects</h1>
          </Fade>

          <div className="work-list">
            <Fade bottom cascade>
              {data.projects.map(project => (
                <Card
                  key={project.id}
                  heading={project.title}
                  paragraph={project.para}
                  img={project.imageSrc}
                  projectLink={project.url}
                  date={project.date}
                  tags={project.tags}
                ></Card>
              ))}
            </Fade>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Work
