import React from "react";
import Layout from "../components/layout"
import SEO from "../components/seo"
// Components
import Header from "../components/Header"
import Work from "../components/Work"
import About from "../components/about"
import Skills from "../components/skills"
import Promotion from "../components/Promotion"
import Footer from "../components/Footer"
import TimeLine from "../components/timeline"
import Map from "../components/map"
import Fade from "react-reveal/Fade"

const IndexPage = () => (
  <Layout>
    <SEO title="Kieran Nehil" />
    <Header></Header>
    <Work></Work>
    <About></About>
    <TimeLine></TimeLine>
    <div className='map-wrapper'>
      <Fade bottom cascade>
        <h1>Adventures</h1>
      </Fade>
    </div>
    <Map></Map>
    <Skills></Skills>
    <Promotion></Promotion>
    <Footer></Footer>
  </Layout>
)

export default IndexPage
