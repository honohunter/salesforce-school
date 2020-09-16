import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Formik, Form } from 'formik';

import {
  makeStyles,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  TextField,
  Checkbox,
  Button,
  Hidden,
  Link,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';

import 'yup-phone';

import yup from '../helpers/helpers';
import { applyAction } from '../api/sendinblue';

import ImageLoader from '../components/imageLoader';

import CloseIcon from '../assets/icons/close.svg';

const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    display: 'flex',
    '& > button': {
      marginLeft: 'auto',
    },
  },
  title: {
    maxWidth: 540,
    margin: 'auto',
  },
  imageWrapper: {
    maxWidth: 480,
    margin: 'auto',
  },
  content: {
    padding: theme.spacing(3.5, 0),
  },
  inputLabel: {
    fontWeight: 500,
  },
  input: {
    padding: theme.spacing(1),
  },
  from: {
    maxWidth: 550,
    marginLeft: 'auto',
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: theme.spacing(1, 1, 3),
    '& > span': {
      paddingTop: 0,
      paddingLeft: 0,
    },
  },
  background: {
    height: 750,
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('sm')]: {
      backgroundPositionX: 'unset',
      backgroundPositionY: 'bottom',
    },
  },
  afterDownload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
  },
  caption: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

const formSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().trim().phoneNumber('Invalid phone number'),
  country: yup.string().required(),
  linkedIn: yup.string().url().required(),
});

export default function ApplyPopup({ close, schedule }) {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);

  const { contentfulApplyPopup } = useStaticQuery(graphql`
    {
      contentfulApplyPopup {
        caption
        title
        privacyPolicyLink
        termsOfUseLink
        textButton
        image {
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
          localFile {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        background {
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
              fixed(width: 1200, height: 700) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `);

  const handelSubmit = values => {
    applyAction(values)
      .then(() => {
        setSubmitted(true);
      })
      .catch(error => {
        console.log(error.response);
      });
    // setSubmitted(true);
  };

  return (
    <Dialog fullWidth maxWidth="lg" open>
      <DialogContent
        style={
          submitted
            ? {
                backgroundImage: `url(${contentfulApplyPopup.background.localFile.childImageSharp.fixed.src})`,
              }
            : {}
        }
        className={classes.background}
      >
        <div className={classes.buttonWrapper}>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </div>

        {!submitted ? (
          <>
            <Typography variant="body2" align="center" paragraph className={classes.caption}>
              Choose a full-time or part-time program
            </Typography>
            <Typography variant="subtitle2" align="center" className={classes.title}>
              {contentfulApplyPopup.title}
            </Typography>
            <Grid container className={classes.content}>
              <Grid item xs={12} md={6}>
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: false,
                    phoneNumber: '',
                    country: '',
                    linkedIn: '',
                    schedule: schedule || 'Part-Time',
                  }}
                  validationSchema={formSchema}
                  onSubmit={handelSubmit}
                >
                  {({ handleChange, errors, touched, isValid, handleBlur, values, isSubmitting }) => (
                    <Form className={classes.from}>
                      <Grid container>
                        <Grid item xs={12}>
                          <div className={classes.input}>
                            <Typography variant="body2" gutterBottom className={classes.inputLabel}>
                              Choose your Schedule
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <RadioGroup
                              aria-label="gender"
                              name="schedule"
                              value={values.schedule}
                              onChange={handleChange}
                              style={{ flexDirection: 'row' }}
                            >
                              <FormControlLabel
                                disabled={Boolean(schedule)}
                                value="Part-Time"
                                control={<Radio color="primary" />}
                                label="Part-Time"
                              />
                              <FormControlLabel
                                disabled={Boolean(schedule)}
                                value="Full-Time"
                                control={<Radio color="primary" />}
                                label="Full-Time"
                              />
                            </RadioGroup>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <div className={classes.input}>
                            <Typography variant="body2" gutterBottom className={classes.inputLabel}>
                              First name
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: 'Type here....' }}
                              variant="outlined"
                              margin="none"
                              fullWidth
                              id="firstName"
                              name="firstName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={errors.firstName && touched.firstName}
                              //   helperText={errors.firstName && touched.firstName ? errors.firstName : null}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <div className={classes.input}>
                            <Typography variant="body2" gutterBottom className={classes.inputLabel}>
                              Last name
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: 'Type here....' }}
                              variant="outlined"
                              margin="none"
                              fullWidth
                              id="lastName"
                              name="lastName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={errors.lastName && touched.lastName}
                              //   helperText={errors.lastName && touched.lastName ? errors.lastName : null}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <div className={classes.input}>
                            <Typography variant="body2" gutterBottom className={classes.inputLabel}>
                              Email
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: 'Type here....' }}
                              variant="outlined"
                              margin="none"
                              fullWidth
                              id="email"
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={errors.email && touched.email}
                              //   helperText={errors.email && touched.email ? errors.email : null}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <div className={classes.input}>
                            <Typography variant="body2" gutterBottom className={classes.inputLabel}>
                              Phone number
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: 'Type here....' }}
                              variant="outlined"
                              margin="none"
                              fullWidth
                              id="phoneNumber"
                              name="phoneNumber"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={errors.phoneNumber && touched.phoneNumber}
                              // helperText={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null}
                            />
                          </div>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <div className={classes.input}>
                            <Typography variant="body2" gutterBottom className={classes.inputLabel}>
                              In which country do you live now?
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: 'Type here....' }}
                              variant="outlined"
                              margin="none"
                              fullWidth
                              id="country"
                              name="country"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={errors.country && touched.country}
                              //   helperText={errors.country && touched.country ? errors.country : null}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <div className={classes.input}>
                            <Typography variant="body2" gutterBottom className={classes.inputLabel}>
                              Your LinkedIn profile
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: 'Type here....' }}
                              variant="outlined"
                              margin="none"
                              fullWidth
                              id="linkedIn"
                              name="linkedIn"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={errors.linkedIn && touched.linkedIn}
                              //   helperText={errors.linkedIn && touched.linkedIn ? errors.linkedIn : null}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          <div className={classes.textWrapper}>
                            <Checkbox
                              color="primary"
                              checked={checked}
                              onChange={() => {
                                setChecked(!checked);
                              }}
                            />
                            <Typography variant="body2">
                              I acknowledge that by clicking &quot;Download&quot;, my data will be used in accordance
                              with the Univertop <Link href={contentfulApplyPopup.termsOfUseLink}>Terms of Use</Link>{' '}
                              and <Link href={contentfulApplyPopup.privacyPolicyLink}>Privacy Policy</Link>, including
                              relevant opt out provisions therein.
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {console.log(isValid || !values.email || isSubmitting || !checked)}
                          <Button
                            disabled={!isValid || isSubmitting || !checked}
                            type="submit"
                            variant="contained"
                            color="default"
                            className={classes.button}
                            fullWidth
                          >
                            {contentfulApplyPopup.textButton}
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
              <Hidden smDown>
                <Grid item xs={12} md={6}>
                  <div className={classes.imageWrapper}>
                    <ImageLoader {...contentfulApplyPopup.image} />
                  </div>
                </Grid>
              </Hidden>
            </Grid>
          </>
        ) : (
          <div className={classes.afterDownload}>
            <Typography variant="subtitle2" align="center" paragraph>
              Thank you for your application! <br /> Someone will contact you soon.
            </Typography>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
