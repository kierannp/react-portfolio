require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  
  siteMetadata: {
    title: `Kieran Nehil-Puleo`,
    description: `ML + Quant Researcher and Materials Science Ph.D. (Vanderbilt). Applying machine learning to financial markets and the physical sciences.`,
    author: `Kieran Nehil-Puleo`,
    siteUrl: `https://kierannp.github.io`,
    image: `/portrait.jpg`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kieran Nehil-Puleo — Portfolio`,
        short_name: `Kieran`,
        start_url: `./`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `minimal-ui`,
	icon: `${__dirname}/src/images/cfa18c749773c0e01b3aae98f82f1f07.png`
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://kierannp.github.io`,
        sitemap: `https://kierannp.github.io/sitemap-index.xml`,
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
    // Self-destroying service worker: unregisters any stale SW left behind by a
    // previous gatsby-plugin-offline deploy (fixes stale-cache StaticQuery errors).
    `gatsby-plugin-remove-serviceworker`,
  ],
}
