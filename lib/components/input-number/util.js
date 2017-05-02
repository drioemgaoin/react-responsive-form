import { isNaN, isFinite, isEmpty, trim } from 'lodash';

export const NumberDecimalPartSeparatorChar = (): string => {
    const aNumber = 0.1;
    return aNumber.toLocaleString().replace('0', '').replace('1', '');
};

export function getParsedState(value: string): number {
    const parsedValue = new Number(value).valueOf();

    if (!isEmpty(trim(value)) && !isNaN(parsedValue)) {
        if (value.indexOf(NumberDecimalPartSeparatorChar) > -1) {
            return parseFloat(value);
        } else {
            return parseInt(value);
        }
    }

    return null;
}

export function getMaxDecimalPlaces(maxDecimalPlaces: number) {
    return isFinite(maxDecimalPlaces) ? maxDecimalPlaces : 0;
}

export function truncateToDecimalPlaces(value: string, maxDecimalPlaces: number) {
  const currentMaxDecimalPlaces = getMaxDecimalPlaces(maxDecimalPlaces);

  if (countDecimals(value) > currentMaxDecimalPlaces) {
      let numberComponents = value.toString().split(NumberDecimalPartSeparatorChar);
      let decimalPlaces = numberComponents[1].substr(0, currentMaxDecimalPlaces);

      return numberComponents[0] + NumberDecimalPartSeparatorChar + decimalPlaces;
  }

  return value;
}

function countDecimals(value: string) {
  const numberParts = value.split(NumberDecimalPartSeparatorChar);
  return numberParts.length <= 1 ? 0 : numberParts[1].length || 0;
}
