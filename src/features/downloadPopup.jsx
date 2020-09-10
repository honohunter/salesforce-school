import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
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
} from '@material-ui/core';

import 'yup-phone';

import ImageLoader from '../components/imageLoader';
import DownLoadButton from '../components/downloadButton';

import CloseIcon from '../assets/icons/close.svg';
import DownloadIcon from '../assets/icons/downloadInverse.svg';

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
    padding: theme.spacing(4, 0, 8),
  },
  inputLabel: {
    fontWeight: 500,
  },
  input: {
    padding: theme.spacing(1),
  },
  from: {
    maxWidth: 550,
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
    height: 700,
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
}));

const formSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.number().required(),
  country: yup.string().required(),
});

export default function DownloadPopup({ open, close, download }) {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(download);
  const [checked, setChecked] = useState(false);

  const { contentfulDownloadPopup } = useStaticQuery(graphql`
    {
      contentfulDownloadPopup {
        title
        privacyPolicyLink
        termsOfUseLink
        downloadLink
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
        pdfLink {
          title
          file {
            fileName
            url
            contentType
          }
        }
      }
    }
  `);

  return (
    <Dialog fullWidth maxWidth="lg" open={open}>
      <DialogContent
        style={
          submitted
            ? {
                backgroundImage: `url(${contentfulDownloadPopup.background.localFile.childImageSharp.fixed.src})`,
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
            <Typography variant="subtitle2" align="center" className={classes.title}>
              {contentfulDownloadPopup.title}
            </Typography>
            <Grid container className={classes.content}>
              <Hidden smDown>
                <Grid item xs={12} md={6}>
                  <div className={classes.imageWrapper}>
                    <ImageLoader {...contentfulDownloadPopup.image} />
                  </div>
                </Grid>
              </Hidden>

              <Grid item xs={12} md={6}>
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: false,
                    phoneNumber: '',
                    country: '',
                  }}
                  validationSchema={formSchema}
                  onSubmit={() => {
                    setSubmitted(true);
                  }}
                >
                  {({ handleChange, errors, touched, isValid, handleBlur, values, isSubmitting }) => (
                    <Form className={classes.from}>
                      <Grid container>
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
                              Phone Number
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: 'Type here....', type: 'number' }}
                              variant="outlined"
                              margin="none"
                              fullWidth
                              id="phoneNumber"
                              name="phoneNumber"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={errors.phoneNumber && touched.phoneNumber}
                              //   helperText={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} md={12}>
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
                              with the Univertop <Link href={contentfulDownloadPopup.termsOfUseLink}>Terms of Use</Link>{' '}
                              and <Link href={contentfulDownloadPopup.privacyPolicyLink}>Privacy Policy</Link>,
                              including relevant opt out provisions therein.
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <DownLoadButton
                            download
                            disabled={!isValid || !values.email || isSubmitting || !checked}
                            type="submit"
                            variant="contained"
                            color="default"
                            className={classes.button}
                            fullWidth
                            startIcon={<DownloadIcon />}
                          >
                            {contentfulDownloadPopup.textButton}
                          </DownLoadButton>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </>
        ) : (
          <div className={classes.afterDownload}>
            <Typography variant="subtitle2" align="center" paragraph>
              Thanks!
              <br /> Syllabus is downloading...
            </Typography>
            <Typography variant="body1" align="center">
              Click{' '}
              <Link href={contentfulDownloadPopup.pdfLink.file.url} target="_blank" download>
                here
              </Link>{' '}
              if nothing happend.
            </Typography>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
