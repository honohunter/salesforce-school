import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, AppBar, Toolbar, Button, Container } from '@material-ui/core';

import ImageLoader from '../components/imageLoader';
import DownloadPopup from './downloadPopup';

const useStyles = makeStyles(theme => ({
  container: {
    // position: 'absolute',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    left: 0,
    right: 0,
    backgroundColor: 'rgba(246, 249, 253, 1)',
  },
  toolbar: {
    padding: 0,
  },
  logoWrapper: {
    flexGrow: 1,
    '& > *': {
      height: 25,
      [theme.breakpoints.down('sm')]: {
        height: 21,
      },
    },
  },
  button: {
    width: 170,
    [theme.breakpoints.down('sm')]: {
      width: 107,
      height: 40,
    },
  },
  scrolled: {
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      backgroundColor: '#ffffff',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      zIndex: 100,
      top: 0,
      boxShadow: '0px 10px 25px rgba(187, 194, 196, 0.37)',
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const handelOpen = () => {
    setOpen(true);
  };

  const handelClose = () => {
    setOpen(false);
  };

  const { contentfulHeader } = useStaticQuery(graphql`
    {
      contentfulHeader {
        buttonText
        logo {
          file {
            url
            details {
              image {
                height
                width
              }
            }
            contentType
          }
          svg {
            dataURI
            content
          }
        }
      }
    }
  `);

  useEffect(() => {
    const onScroll = e => {
      setScrolled(e.target.documentElement.scrollTop > 100);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrolled, setScrolled]);

  return (
    <section className={classes.container}>
      <Container className={clsx(scrolled && classes.scrolled)}>
        <AppBar color="transparent" position="sticky">
          <Toolbar className={classes.toolbar}>
            <div className={classes.logoWrapper}>
              <ImageLoader {...contentfulHeader.logo} />
            </div>
            <Button variant="contained" color="default" className={classes.button} onClick={handelOpen}>
              {contentfulHeader.buttonText}
            </Button>
          </Toolbar>
        </AppBar>
      </Container>
      <DownloadPopup open={open} close={handelClose} />
    </section>
  );
}
