import { isNaN, isFinite, isEmpty, trim, isString } from 'lodash';

export const getNumberDecimalPartSeparatorChar = (): string => {
    const aNumber = 0.1;
    return aNumber.toLocaleString().replace('0', '').replace('1', '');
};

export function parse(value) {
  if (isString(value)) {
    const parsedValue = isString(value) ? new Number(value).valueOf() : value;

    if (!isEmpty(trim(value)) && !isNaN(parsedValue)) {
        if (value.indexOf(getNumberDecimalPartSeparatorChar()) > -1) {
            return parseFloat(value);
        } else {
            return parseInt(value);
        }
    }

    return undefined;
  }

  return value;
}

export function getMaxDecimalPlaces(maxDecimalPlaces) {
    return isFinite(maxDecimalPlaces) ? maxDecimalPlaces : 0;
}

export function truncateToDecimalPlaces(value, maxDecimalPlaces) {
  const currentMaxDecimalPlaces = getMaxDecimalPlaces(maxDecimalPlaces);
  const valueAsString = isString(value) ? value : value.toString();

  if (countDecimals(valueAsString) > currentMaxDecimalPlaces) {
      let numberComponents = valueAsString.split(getNumberDecimalPartSeparatorChar());
      let decimalPlaces = numberComponents[1].substr(0, currentMaxDecimalPlaces);

      return numberComponents[0] + getNumberDecimalPartSeparatorChar() + decimalPlaces;
  }

  return value;
}

function countDecimals(value) {
  const numberParts = value.split(getNumberDecimalPartSeparatorChar());
  return numberParts.length <= 1 ? 0 : numberParts[1].length || 0;
}
