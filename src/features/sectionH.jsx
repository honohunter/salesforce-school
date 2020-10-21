import React, { useState } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { makeStyles, Container, Grid, Typography, Button } from '@material-ui/core';

import ImageLoader from '../components/imageLoader';

import DownloadIcon from '../assets/icons/download.svg';

import DownloadPopup from './downloadPopup';

const useStyles = makeStyles(theme => ({
  section: {
    backgroundColor: '#fff',
    padding: theme.spacing(5, 0, 0),
    overflow: 'hidden',
  },
  text: {
    maxWidth: 484,
    margin: 'auto',
  },
  buttonContainer: {
    maxWidth: 500,
    margin: 'auto',
    padding: theme.spacing(2, 0),
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: 750,
    margin: 'auto',
    marginLeft: '50%',
    marginTop: -32,
    transform: 'translateX(-50%)',
    [theme.breakpoints.down('xs')]: {
      width: 450,
    },
  },
  buttonWrapper: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      maxWidth: 210,
      margin: 'auto',
    },
  },
}));

export default function SectionH() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handelOpen = () => {
    setOpen(true);
  };

  const handelClose = () => {
    setOpen(false);
  };

  const { contentfulSectionH } = useStaticQuery(graphql`
    {
      contentfulSectionH {
        title
        text
        textButton_1
        textButton_2
        leftImage {
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
            dataURI
            content
          }
        }
        rightImage {
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
        <Typography variant="h2" align="center" paragraph>
          {contentfulSectionH.title}
        </Typography>
        <Typography variant="body1" align="center" paragraph className={classes.text}>
          {contentfulSectionH.text}
        </Typography>
        <Grid container className={classes.buttonContainer}>
          <Grid item xs={12} md={6}>
            <div className={classes.buttonWrapper}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={() => {
                  navigate('/#courses');
                }}
              >
                {contentfulSectionH.textButton_1}
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.buttonWrapper}>
              <Button
                onClick={handelOpen}
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                startIcon={<DownloadIcon />}
              >
                {contentfulSectionH.textButton_2}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>

      <div className={classes.imageContainer}>
        <ImageLoader {...contentfulSectionH.leftImage} />
        <ImageLoader {...contentfulSectionH.rightImage} />
      </div>
      {open && <DownloadPopup close={handelClose} />}
    </section>
  );
}
