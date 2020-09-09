import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Container, Grid, Typography, Hidden } from '@material-ui/core';

import ImageLoader from '../components/imageLoader';
import Carousel from '../components/carousel';

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(5, 0),
  },
  textContainer: {
    maxWidth: 450,
  },
  caption: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  imageWrapper: {
    marginBottom: 20,
    height: 54,
  },
  carouselItem: {
    minHeight: 200,
  },
}));

export default function SectionE() {
  const classes = useStyles();

  const { contentfulSectionE } = useStaticQuery(graphql`
    {
      contentfulSectionE {
        caption
        title
        text
        subText
        text_1
        text_2
        text_3
        text_4
        title_1
        title_2
        title_3
        title_4
        image_1 {
          file {
            url
            contentType
            details {
              image {
                height
                width
              }
            }
          }
          svg {
            content
            dataURI
          }
        }
        image_2 {
          file {
            url
            contentType
            details {
              image {
                height
                width
              }
            }
          }
          svg {
            content
            dataURI
          }
        }
        image_3 {
          file {
            url
            contentType
            details {
              image {
                height
                width
              }
            }
          }
          svg {
            content
            dataURI
          }
        }
        image_4 {
          file {
            url
            contentType
            details {
              image {
                height
                width
              }
            }
          }
          svg {
            content
            dataURI
          }
        }
      }
    }
  `);

  return (
    <section className={classes.section}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className={classes.textContainer}>
              <Typography variant="body2" paragraph className={classes.caption}>
                {contentfulSectionE.caption}
              </Typography>
              <Typography variant="h2" paragraph>
                {contentfulSectionE.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {contentfulSectionE.text}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {contentfulSectionE.subText}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Hidden smDown>
              <Grid container spacing={5}>
                {[...Array(4).keys()].map(ele => (
                  <Grid key={ele} item xs={6}>
                    <div className={classes.imageWrapper}>
                      <ImageLoader {...contentfulSectionE[`image_${ele + 1}`]} />
                    </div>
                    <Typography variant="h4" paragraph>
                      {contentfulSectionE[`title_${ele + 1}`]}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {contentfulSectionE[`text_${ele + 1}`]}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Carousel autoPlay={false} navigationButtonColor="#EAF2FE">
                {[...Array(4).keys()].map(ele => (
                  <Grid key={ele} item xs={12} className={classes.carouselItem}>
                    <div className={classes.imageWrapper}>
                      <ImageLoader {...contentfulSectionE[`image_${ele + 1}`]} />
                    </div>
                    <Typography variant="h4" paragraph>
                      {contentfulSectionE[`title_${ele + 1}`]}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {contentfulSectionE[`text_${ele + 1}`]}
                    </Typography>
                  </Grid>
                ))}
              </Carousel>
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
