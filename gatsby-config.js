require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Become a Sales Expert and Launch Your Remote Career`,
    titleTemplate: ``,
    description: `Invest 3 months and launch your remote career with a dedicated mentor and partner company. Learn in-demand skills and get remote experience while studying. Plus, this is the first program where you'll get the opportunity to apply yourself and earn money before the course is finished.`,
    author: ``,
    image: `/images/meta.png`,
    url: ``,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/assets/icons/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-preload-fonts`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN,
        downloadLocal: true,
      },
    },
    `gatsby-transformer-inline-svg`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
