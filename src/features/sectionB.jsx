import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Container, Grid, Divider, Typography, Hidden } from '@material-ui/core';

import ImageLoader from '../components/imageLoader';
import Carousel from '../components/carousel';

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(5, 0),
    backgroundColor:'#fff'
  },
  imagesContainer: {
    marginBottom: theme.spacing(2),
  },
  textContainer: {
    maxWidth: 274,
  },
  carouselItem: {
    minHeight: 270,
  },
}));

export default function SectionB() {
  const classes = useStyles();
  const { contentfulSectionB } = useStaticQuery(graphql`
    {
      contentfulSectionB {
        image_1 {
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
        image_2 {
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
        image_3 {
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
        image_4 {
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
        text_1
        text_2
        text_3
        text_4
        title_1
        title_2
        title_3
        title_4
      }
    }
  `);

  return (
    <>
      <section className={classes.section}>
        <Container>
          <Hidden smDown>
            <Grid container className={classes.imagesContainer}>
              {[...Array(4).keys()].map(ele => (
                <Grid key={ele} item xs={12} md={3}>
                  <ImageLoader {...contentfulSectionB[`image_${ele + 1}`]} />
                </Grid>
              ))}
            </Grid>
            <Grid container>
              {[...Array(4).keys()].map(ele => (
                <Grid key={ele} item xs={12} md={3}>
                  <Typography variant="h6" paragraph className={classes.textContainer}>
                    {contentfulSectionB[`title_${ele + 1}`]}
                  </Typography>
                  <Typography variant="body2" className={classes.textContainer}>
                    {contentfulSectionB[`text_${ele + 1}`]}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Carousel autoPlay={false} navigationButtonColor="#EAF2FE">
              {[...Array(4).keys()].map(ele => (
                <Grid key={ele} container justify="center" alignItems="center">
                  <Grid item className={classes.carouselItem}>
                    <div className={classes.imagesContainer}>
                      <ImageLoader {...contentfulSectionB[`image_${ele + 1}`]} />
                    </div>
                    <Typography variant="h6" paragraph className={classes.textContainer}>
                      {contentfulSectionB[`title_${ele + 1}`]}
                    </Typography>
                    <Typography variant="body1" className={classes.textContainer}>
                      {contentfulSectionB[`text_${ele + 1}`]}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Carousel>
          </Hidden>
        </Container>
      </section>
      <Divider />
    </>
  );
}
