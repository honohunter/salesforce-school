import React, { useState } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { makeStyles, Container, Grid, Typography, Button, Hidden } from '@material-ui/core';

import ImageLoader from '../components/imageLoader';
import DownloadIcon from '../assets/icons/download.svg';

import DownloadPopup from './downloadPopup';

const useStyles = makeStyles(theme => ({
  section: {
    background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(246, 249, 253, 0.9) 100%)',
    padding: theme.spacing(0, 0, 5),
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 0),
    },
  },
  title: {
    maxWidth: 470,
  },
  text: {
    maxWidth: 360,
  },
  buttonWrapper: {
    maxWidth: 450,
    [theme.breakpoints.down('sm')]: {
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
  },
  button: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      '& > button:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
  },
}));

export default function SectionA() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handelOpen = () => {
    setOpen(true);
  };

  const handelClose = () => {
    setOpen(false);
  };

  const { contentfulSectionA } = useStaticQuery(graphql`
    {
      contentfulSectionA {
        image {
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
          localFile {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        title
        textButton_2
        textButton_1
        text
      }
    }
  `);

  return (
    <section className={classes.section}>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className={classes.leftContainer}>
              <Typography variant="h1" className={classes.title}>
                {contentfulSectionA.title}
              </Typography>
              <Typography variant="body1" className={classes.text}>
                {contentfulSectionA.text}
              </Typography>
              <Grid container justify="space-between" className={classes.buttonWrapper}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => {
                    navigate('/#courses');
                  }}
                >
                  {contentfulSectionA.textButton_1}
                </Button>
                <Button
                  onClick={handelOpen}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<DownloadIcon />}
                >
                  {contentfulSectionA.textButton_2}
                </Button>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Hidden smDown>
              <ImageLoader {...contentfulSectionA.image} />
            </Hidden>
          </Grid>
        </Grid>
      </Container>
      {open && <DownloadPopup close={handelClose} />}
    </section>
  );
}
