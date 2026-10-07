/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            image
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const metaImage = site.siteMetadata?.siteUrl
    ? `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`
    : site.siteMetadata?.image

  const canonical = site.siteMetadata?.siteUrl

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kieran Nehil-Puleo",
    url: canonical,
    image: metaImage,
    jobTitle: "ML + Quant Researcher",
    description: metaDescription,
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Vanderbilt University" },
      { "@type": "CollegeOrUniversity", name: "Michigan State University" },
    ],
    knowsAbout: [
      "Machine Learning",
      "Quantitative Finance",
      "Graph Neural Networks",
      "Materials Science",
      "Molecular Simulation",
    ],
    sameAs: [
      "https://github.com/kierannp",
      "https://www.linkedin.com/in/kieran-nehil-puleo-b4a16a10b/",
      "https://www.researchgate.net/profile/Kieran-Nehil-Puleo",
      "https://lab.vanderbilt.edu/zyang-lab/person/nehil-puleo-d-kieran/",
      "https://pubs.acs.org/doi/10.1021/acs.jpcb.3c07304",
      "https://www.nature.com/articles/s41524-026-02263-y",
    ],
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `${defaultTitle} \u2014 %s` : null}
      link={canonical ? [{ rel: `canonical`, href: `${canonical}/` }] : []}
      script={[
        {
          type: `application/ld+json`,
          innerHTML: JSON.stringify(personSchema),
        },
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: metaImage,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
