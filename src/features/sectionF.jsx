import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';

import ImageLoader from '../components/imageLoader';

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(8, 0),
    backgroundColor: '#F8FAFC',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 0),
    },
  },
  caption: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  imageWrapper: {
    width: 210,
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    padding: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 2),
      width: 100,
      '& > *': {
        height: 18,
      },
    },
  },
  imageContainer: {
    // maxWidth: 900,
    margin: 'auto',
    padding: theme.spacing(6, 0),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
}));

export default function SectionF() {
  const classes = useStyles();

  const { contentfulSectionF } = useStaticQuery(graphql`
    {
      contentfulSectionF {
        caption
        title
        partnersLogo {
          file {
            contentType
            url
            details {
              image {
                height
                width
              }
            }
          }
          svg {
            dataURI
            content
          }
        }
      }
    }
  `);

  return (
    <section className={classes.section}>
      <Container>
        <Typography variant="body2" paragraph className={classes.caption} align="center">
          {contentfulSectionF.caption}
        </Typography>
        <Typography variant="h2" paragraph align="center">
          {contentfulSectionF.title}
        </Typography>
        <div className={classes.imageContainer}>
          <Grid container>
            {contentfulSectionF.partnersLogo.map((logo, index) => (
              <Grid key={index} item xs>
                <div className={classes.imageWrapper}>
                  <ImageLoader {...logo} />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
}
