import React from "react"
import Card from "./atoms/Card"
import FlagshipCard from "./atoms/FlagshipCard"
import Fade from "react-reveal/Fade"

import data from "../yourdata"

const Work = () => {
  return (
    <div className="section" id="work">
      <div className="container">
        <div className="work-wrapper">
          <Fade bottom>
            <h1>Flagship Projects</h1>
          </Fade>

          <div className="work-list">
            <Fade bottom cascade>
              {data.flagshipProjects.map(project => (
                <FlagshipCard
                  key={project.id}
                  heading={project.title}
                  problem={project.problem}
                  solution={project.solution}
                  impact={project.impact}
                  img={project.imageSrc}
                  links={project.links}
                  date={project.date}
                  tags={project.tags}
                ></FlagshipCard>
              ))}
            </Fade>
          </div>
        </div>
        <hr className="divider" />
        <div className="work-wrapper">
          <Fade bottom>
            <h1 className="other-projects-title">Other Projects</h1>
          </Fade>

          <div className="work-list">
            <Fade bottom cascade>
              {data.otherProjects.map(project => (
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
