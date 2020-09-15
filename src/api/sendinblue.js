/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const option = {
  method: 'POST',
  url: 'https://api.sendinblue.com/v3/contacts',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'api-key': process.env.GATSBY_SENDINBLUE_ACCESS_TOKEN,
  },
  data: {
    attributes: {
      FIRSTNAME: '',
      LASTNAME: '',
      SMS: '',
      COUNTRY: '',
    },
    email: '',
    updateEnabled: true,
    listIds: [],
  },
  responseType: 'json',
};

const downloadAction = async ({ lastName, firstName, email, phoneNumber, country }) => {
  const data = await axios({
    ...option,
    data: {
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        SMS: phoneNumber,
        COUNTRY: country,
      },
      email,
      updateEnabled: true,
      listIds: [parseInt(process.env.GATSBY_LIST_DOWNLOAD_ID, 10)],
    },
  });
  return data;
};

const applyAction = async ({ lastName, firstName, email, phoneNumber, country, linkedIn, schedule }) => {
  const data = await axios({
    ...option,
    data: {
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        SMS: phoneNumber,
        COUNTRY: country,
        LINKEDIN: linkedIn,
        PROGRAM: schedule,
      },
      email,
      updateEnabled: true,
      listIds: [parseInt(process.env.GATSBY_LIST_APPLY_ID, 10)],
    },
  });
  return data;
};

export { downloadAction, applyAction };
