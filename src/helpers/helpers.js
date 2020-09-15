/* eslint-disable func-names */
import { parsePhoneNumber, parsePhoneNumberFromString, ParseError } from 'libphonenumber-js';

import * as yup from 'yup';

yup.addMethod(yup.string, 'phoneNumber', function (message) {
  return this.test('phoneNumberTest', message, function (value) {
    let isError = false;
    let phoneNumber;

    try {
      isError = false;
      parsePhoneNumber(value);
      phoneNumber = parsePhoneNumberFromString(value);
    } catch (error) {
      if (error instanceof ParseError) {
        isError = true;
        console.log(error.message);
      }
    }

    return !isError && phoneNumber.isValid();
  });
});

export default yup;
