import React, { useState } from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import data from "../yourdata"
import "../styles/mains.scss"

// The live app runs on Google Cloud Run (Grouper needs RDKit, nauty and a
// compiled C++ extension, which a static GitHub Pages site can't host).
const GrouperDemoPage = () => {
  const fullUrl = data.grouperDemo.url
  // GATSBY_GROUPER_DEMO_URL lets `gatsby develop` point at a local copy
  // of the app (python grouper-demo/app.py).
  const embedUrl = `${
    process.env.GATSBY_GROUPER_DEMO_URL || data.grouperDemo.url
  }/?embed=1`
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <SEO
        title="Grouper interactive demo"
        description="Try Grouper in the browser: fragment molecules into functional groups, exhaustively enumerate chemical spaces, and sample new molecules, with CSV/SDF/JSON downloads."
      />
      <div className="demo-page">
        <header className="demo-header">
          <Link to="/#work" className="demo-back">
            &larr; Kieran Nehil-Puleo
          </Link>
          <a
            className="btn demo-open"
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open full screen
          </a>
        </header>

        <section className="demo-intro">
          <h1>Grouper: try it live</h1>
          <p>
            Grouper describes molecules as graphs of functional groups and uses
            graph symmetry to generate each molecule exactly once. Below is the
            real library running on a small server: fragment a molecule with a
            group-contribution library, enumerate every molecule you can build
            from a handful of groups, or sample new ones at random. Every result
            can be downloaded as CSV, SDF or Grouper JSON.
          </p>
          <p className="demo-links">
            <a
              href="https://www.nature.com/articles/s41524-026-02263-y"
              target="_blank"
              rel="noopener noreferrer"
            >
              Paper (npj Computational Materials)
            </a>
            <span aria-hidden="true">&middot;</span>
            <a
              href="https://github.com/mosdef-hub/Grouper"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code
            </a>
          </p>
        </section>

        <div className="demo-frame">
          {!loaded && (
            <div className="demo-loading" role="status">
              <div className="demo-spinner" aria-hidden="true" />
              <p>Starting the demo&hellip;</p>
              <p className="demo-loading-note">
                If it has been idle, the server takes a few seconds to wake up.
              </p>
            </div>
          )}
          <iframe
            src={embedUrl}
            title="Grouper interactive demo"
            onLoad={() => setLoaded(true)}
            allow="clipboard-write"
            // The app is on another origin; it needs scripts and its own
            // storage, plus downloads for the CSV/SDF/JSON buttons, but must
            // not be able to navigate this page.
            sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </>
  )
}

export default GrouperDemoPage
