import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Typography, Container, Grid, Paper, Button } from '@material-ui/core';

import CheckIcon from '../assets/icons/check.svg';

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(5, 0),
    backgroundColor:'#fff'
  },
  textContainer: {
    maxWidth: 600,
    margin: 'auto',
  },
  caption: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  paperContainer: {
    maxWidth: 950,
    margin: 'auto',
    '& > div': {
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2, 0),
      },
    },
  },
  paper: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    border: '2px solid #EEF3F9',
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  iconWrapper: {
    height: 28,
    minWidth: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(3),
    borderRadius: 3,
    border: '4px solid #EEF3F9',
  },
  checkboxContainer: {
    padding: theme.spacing(3, 0),
    '& > div': {
      paddingBottom: theme.spacing(2),
    },
  },
  checkboxLabeled: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    width: 205,
  },
}));

export default function SectionC() {
  const classes = useStyles();

  const { contentfulSectionC } = useStaticQuery(graphql`
    {
      contentfulSectionC {
        caption
        title
        text
        title_1
        text_1
        checkboxLabel_1_a
        checkboxLabel_1_b
        textButton_1
        title_2
        text_2
        checkboxLabel_2_a
        checkboxLabel_2_b
        textButton_2
      }
    }
  `);

  return (
    <section className={classes.section}>
      <Container>
        <div className={classes.textContainer}>
          <Typography variant="body2" align="center" gutterBottom className={classes.caption}>
            {contentfulSectionC.caption}
          </Typography>
          <Typography variant="h2" align="center" paragraph>
            {contentfulSectionC.title}
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            {contentfulSectionC.text}
          </Typography>
        </div>
        <Grid container className={classes.paperContainer}>
          {[...Array(2).keys()].map(ele => (
            <Grid key={`section_${ele}`} item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                  {contentfulSectionC[`title_${ele + 1}`]}
                </Typography>
                <Typography variant="caption">{contentfulSectionC[`text_${ele + 1}`]}</Typography>
                <div className={classes.checkboxContainer}>
                  <div className={classes.checkboxLabeled}>
                    <div className={classes.iconWrapper}>
                      <CheckIcon />
                    </div>
                    <Typography variant="h4">{contentfulSectionC[`checkboxLabel_${ele + 1}_a`]}</Typography>
                  </div>
                  <div className={classes.checkboxLabeled}>
                    <div className={classes.iconWrapper}>
                      <CheckIcon />
                    </div>
                    <Typography variant="h4">{contentfulSectionC[`checkboxLabel_${ele + 1}_b`]}</Typography>
                  </div>
                </div>
                <Button variant="contained" color="secondary" className={classes.button}>
                  {contentfulSectionC[`textButton_${ele + 1}`]}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
