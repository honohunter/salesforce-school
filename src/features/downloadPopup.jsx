import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Formik, Form } from 'formik';
import { saveAs } from 'file-saver';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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

import yup from '../helpers/helpers';
import { downloadAction } from '../api/sendinblue';

import ImageLoader from '../components/imageLoader';

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
  phoneNumber: yup.string().trim().phoneNumber('Invalid phone number'),
  country: yup.string().required(),
});

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Typography variant="body2">{children}</Typography>,
    [INLINES.HYPERLINK]: (node, children) => <Link href={node.data.uri}>{children}</Link>,
  },
};

export default function DownloadPopup({ close }) {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);

  const { contentfulDownloadPopup } = useStaticQuery(graphql`
    {
      contentfulDownloadPopup {
        title
        textButton
        label_1
        label_2
        label_3
        label_4
        label_5
        inputPlaceholder
        privacyStatement {
          json
        }
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

  const handelSubmit = values => {
    downloadAction(values)
      .then(() => {
        saveAs(contentfulDownloadPopup.pdfLink.file.url, contentfulDownloadPopup.pdfLink.title);
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
                  onSubmit={handelSubmit}
                >
                  {({ handleChange, errors, touched, isValid, handleBlur, values, isSubmitting }) => (
                    <Form className={classes.from}>
                      <Grid container>
                        <Grid item xs={12} md={6}>
                          <div className={classes.input}>
                            <Typography variant="body2" gutterBottom className={classes.inputLabel}>
                              {contentfulDownloadPopup.label_1}
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: contentfulDownloadPopup.inputPlaceholder }}
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
                              {contentfulDownloadPopup.label_2}
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: contentfulDownloadPopup.inputPlaceholder }}
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
                              {contentfulDownloadPopup.label_3}
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: contentfulDownloadPopup.inputPlaceholder }}
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
                              {contentfulDownloadPopup.label_4}
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: contentfulDownloadPopup.inputPlaceholder }}
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
                        <Grid item xs={12} md={12}>
                          <div className={classes.input}>
                            <Typography variant="body2" gutterBottom className={classes.inputLabel}>
                              {contentfulDownloadPopup.label_5}
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              inputProps={{ placeholder: contentfulDownloadPopup.inputPlaceholder }}
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
                            {documentToReactComponents(contentfulDownloadPopup.privacyStatement.json, options)}
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Button
                            disabled={!isValid || isSubmitting || !checked}
                            type="submit"
                            variant="contained"
                            color="default"
                            className={classes.button}
                            fullWidth
                            startIcon={<DownloadIcon />}
                          >
                            {contentfulDownloadPopup.textButton}
                          </Button>
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
