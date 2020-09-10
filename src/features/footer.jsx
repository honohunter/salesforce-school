import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  section: {
    backgroundColor: '#F8FAFC',
    padding: theme.spacing(4, 0),
  },
}));

export default function Footer() {
  const classes = useStyles();

  const { contentfulFooter } = useStaticQuery(graphql`
    {
      contentfulFooter {
        text
      }
    }
  `);

  return (
    <section className={classes.section}>
      <Container>
        <Typography variant="body2" align="center">
          {contentfulFooter.text}
        </Typography>
      </Container>
    </section>
  );
}
