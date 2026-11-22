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
import data from "../yourdata"
function SEO({ description, lang, meta, title, path, image }) {
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
  const siteUrl = site.siteMetadata?.siteUrl || ``
  // Person/portrait image for the schema; pages may override the share image.
  const personImage = `${siteUrl}${site.siteMetadata?.image}`
  const metaImage = image ? `${siteUrl}${image}` : personImage

  const canonical = siteUrl
  // Each page is its own canonical URL (a root-only canonical would tell
  // search engines every page duplicates the homepage).
  const pageUrl = `${siteUrl}${path || "/"}`

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kieran Nehil-Puleo",
    url: canonical,
    image: personImage,
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
      link={siteUrl ? [{ rel: `canonical`, href: pageUrl }] : []}
      script={[
        {
          type: `application/ld+json`,
          innerHTML: JSON.stringify(personSchema),
        },
      ].concat(
        data.goatcounterCode
          ? [
              {
                async: true,
                src: `https://gc.zgo.at/count.js`,
                "data-goatcounter": `https://${data.goatcounterCode}.goatcounter.com/count`,
              },
            ]
          : []
      )}
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
          property: `og:url`,
          content: pageUrl,
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
  path: `/`,
  image: null,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  image: PropTypes.string,
}

export default SEO
