import 'fontsource-jost/latin.css';

import React from 'react';
import { createMuiTheme, responsiveFontSizes, makeStyles, ThemeProvider, CssBaseline } from '@material-ui/core';

import SEO from '../components/seo';
import Header from '../features/header';
import SectionA from '../features/sectionA';
import SectionB from '../features/sectionB';
import SectionC from '../features/sectionC';
import SectionD from '../features/sectionD';
import SectionE from '../features/sectionE';
import SectionF from '../features/sectionF';
import SectionG from '../features/sectionG';
import SectionH from '../features/sectionH';
import Footer from '../features/footer';

let theme = createMuiTheme({
  shadows: Array(25).fill('none'),
  palette: {
    primary: {
      main: '#5594FF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#EAF2FE',
      contrastText: '#5594FF',
    },
  },
  typography: {
    fontFamily: 'Jost',
    button: {
      textTransform: 'none',
      fontSize: 14,
      fontWeight: 500,
    },
    h1: {
      fontSize: 46,
      fontWeight: 600,
    },
    h2: {
      fontSize: 42,
      fontWeight: 600,
    },
    h3: {
      fontSize: 20,
      fontWeight: 500,
    },
    h4: {
      fontSize: 16,
      fontWeight: 500,
    },
    h5: {
      fontSize: 22,
      fontWeight: 500,
    },
    h6: {
      fontSize: 18,
      fontWeight: 500,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
    caption: {
      fontSize: 18,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1,
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        height: 54,
        backgroundColor: '#2FBF84',
        color: '#ffffff',
        boxShadow: '0px 4px 4px rgba(42, 179, 123, 0.25)',
        '&:hover': {
          backgroundColor: '#219c6a',
        },
      },
      containedPrimary: {
        boxShadow: '0px 4px 4px rgba(70, 111, 255, 0.25)',
      },
      containedSecondary: {
        boxShadow: 'unset',
        '&:hover': {
          backgroundColor: '#c1cfe4',
        },
      },
      containedSizeLarge: {
        height: 64,
      },
    },
    MuiOutlinedInput: {
      input: {
        backgroundColor: '#F7F7F7',
      },
      notchedOutline: {
        borderColor: '#DBDBDB',
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO />
      <Header />
      <SectionA />
      <SectionB />
      <SectionC />
      <SectionD />
      <SectionE />
      <SectionF />
      <SectionG />
      <SectionH />
      <Footer />
    </ThemeProvider>
  );
}
