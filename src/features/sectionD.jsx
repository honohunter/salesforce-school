import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';
import ImageLoader from '../components/imageLoader';
import Carousel from '../components/carousel';

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(8, 0),
    backgroundColor: '#FFFAF2',
  },
  imageWrapper: {
    maxWidth: 560,
    [theme.breakpoints.up('md')]: {
      minHeight: 490,
    },
  },
  textContainer: {
    maxWidth: 480,
  },
  caption: {
    color: '#FEA82E',
    fontWeight: 600,
  },
  navigationContainer: {
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      marginLeft: '50%',
      position: 'relative',
      bottom: 40,
      height: 0,
      paddingLeft: '20px',
    },
  },
}));

export default function SectionD() {
  const classes = useStyles();

  const { allContentfulSectionD } = useStaticQuery(graphql`
    {
      allContentfulSectionD {
        nodes {
          image {
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
            localFile {
              childImageSharp {
                fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          caption
          title
          paragraph_1 {
            paragraph_1
          }
          paragraph_2 {
            paragraph_2
          }
        }
      }
    }
  `);

  return (
    <section className={classes.section}>
      <Container>
        <Carousel
          autoPlay={false}
          navigationButtonColor="rgba(255, 232, 199, 0.8)"
          classes={{ navigationContainer: classes.navigationContainer }}
        >
          {allContentfulSectionD.nodes.map((node, index) => (
            <Grid key={index} container spacing={5}>
              <Grid item xs={12} md={6}>
                <div className={classes.imageWrapper}>
                  <ImageLoader {...node.image} />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={classes.textContainer}>
                  <Typography variant="body2" paragraph className={classes.caption}>
                    {node.caption}
                  </Typography>
                  <Typography variant="h2" paragraph>
                    {node.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {node.paragraph_1.paragraph_1}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {node.paragraph_2.paragraph_2}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
