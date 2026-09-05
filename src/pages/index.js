import React from "react";
import Layout from "../components/layout"
import SEO from "../components/seo"
// Components
import Header from "../components/Header"
import Work from "../components/Work"
import About from "../components/about"
import Skills from "../components/skills"
import Footer from "../components/Footer"
import Map from "../components/map"
import Fade from "react-reveal/Fade"

const IndexPage = () => (
  <Layout>
    <SEO title="ML + Quant Researcher" />
    <Header></Header>
    <hr className="divider" />
    <About></About>
    <hr className="divider" />
    <Work></Work>
    <hr className="divider" />
    <Skills></Skills>
    <hr className="divider" />
    <div className='map-wrapper' id="adventures">
      <Fade bottom cascade>
        <h1 className="adventures-title">Adventures</h1>
      </Fade>
    </div>
    <Map></Map>
    <hr className="divider" />
    <Footer></Footer>
  </Layout>
)

export default IndexPage
