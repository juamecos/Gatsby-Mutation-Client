require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: 'Mutation in Gatsby With Apollo',
  },
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'MYAPI',
        fieldName: 'myapi',
        url: process.env.DB_ENDPOINT,
      },
    },
  ],
};
