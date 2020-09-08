/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Img from 'gatsby-image';

const useStyles = makeStyles(() => ({
  image: ({ height, width }) => ({
    height,
    width,
  }),
}));

// Render inline SVG with fallback non-svg images
export default function Image({ svg, file, localFile }) {
  const classes = useStyles({ ...file.details.image });
  if (file.contentType === 'image/svg+xml') {
    return <img src={svg.dataURI} alt="svg" className={classes.image} />;
  }
  return <Img fluid={localFile.childImageSharp.fluid} />;
}
