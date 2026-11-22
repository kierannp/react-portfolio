import React from "react"
import FlagshipCard from "./atoms/FlagshipCard"
import Fade from "react-reveal/Fade"

import data from "../yourdata"

// Label the single link on the smaller projects by what it points to.
const linkLabel = url =>
  /github\.com/.test(url) ? "Code" : /\.pdf/i.test(url) ? "Talk (PDF)" : "View"

// One grid: the flagship projects first, then the smaller ones in the same
// card style (they have no venue, so the card shows their date instead).
const projects = [
  ...data.flagshipProjects.map(p => ({
    key: `f${p.id}`,
    heading: p.shortTitle || p.title,
    subtitle: p.shortTitle ? p.title : null,
    summary: p.summary,
    problem: p.problem,
    solution: p.solution,
    impact: p.impact,
    img: p.imageSrc,
    venue: p.venue,
    links: p.links,
    demo: p.demo,
    date: p.date,
    tags: p.tags,
  })),
  ...data.otherProjects.map(p => ({
    key: `o${p.id}`,
    heading: p.title,
    summary: p.para,
    img: p.imageSrc,
    links: p.url ? [{ label: linkLabel(p.url), url: p.url }] : [],
    date: p.date,
    tags: p.tags,
  })),
]

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
              {projects.map(({ key, ...project }) => (
                <FlagshipCard key={key} {...project}></FlagshipCard>
              ))}
            </Fade>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Work
