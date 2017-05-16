import { isNaN, isEmpty, trim } from 'lodash';
import { getNumberDecimalPartSeparatorChar, getMaxDecimalPlaces } from './util';

export default function validate(
    enteredValue: string,
    maxDecimalPlaces: number,
    min: number) {
  if (hasInvalidDecimalSeparator(enteredValue, maxDecimalPlaces)) {
      return false;
  }

  if (hasValidDecimalSeparatorChar(enteredValue, maxDecimalPlaces)) {
      return true;
  }

  if (hasValidNumber(enteredValue)) {
      return true;
  }

  if (hasValidEmptyString(enteredValue)) {
      return true;
  }

  if (hasValidNegativeSign(enteredValue, min)) {
      return true;
  }

  return false;
}

function hasInvalidDecimalSeparator(enteredValue: string, maxDecimalPlaces: number) {
  const currentMaxDecimalPlaces = getMaxDecimalPlaces(maxDecimalPlaces);

  return currentMaxDecimalPlaces === 0 && enteredValue.indexOf(getNumberDecimalPartSeparatorChar()) > -1;
}

function hasValidDecimalSeparatorChar(value: string, maxDecimalPlaces: number) {
  const currentMaxDecimalPlaces = getMaxDecimalPlaces(maxDecimalPlaces);

  if (currentMaxDecimalPlaces > 0 && value === getNumberDecimalPartSeparatorChar()) {
      return true;
  }

  return false;
}

function hasValidNumber(value: string) {
  let enteredNumber = new Number(value).valueOf();
  if (!isNaN(enteredNumber)) {
      return true;
  }

  return false;
}

function hasValidEmptyString(value: string) {
  return isEmpty(trim(value));
}

function hasValidNegativeSign(value: string, min: number) {
  return !(value !== '-' || (min !== null && value === '-' && min >= 0));
}
