import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { saveAs } from 'file-saver';
import { Button } from '@material-ui/core';

export default function DownloadButton(props) {
  const { contentfulDownloadPopup } = useStaticQuery(graphql`
    {
      contentfulDownloadPopup {
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
    <Button
      {...props}
      onClick={() => {
        props.onClick && props.onClick();
        props.download && saveAs(contentfulDownloadPopup.pdfLink.file.url, contentfulDownloadPopup.pdfLink.title);
      }}
    />
  );
}
