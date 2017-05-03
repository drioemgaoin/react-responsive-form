import { isNaN, isFinite, isEmpty, trim } from 'lodash';

export const getNumberDecimalPartSeparatorChar = (): string => {
    const aNumber = 0.1;
    return aNumber.toLocaleString().replace('0', '').replace('1', '');
};

export function parse(value: string): number {
    const parsedValue = new Number(value).valueOf();

    if (!isEmpty(trim(value)) && !isNaN(parsedValue)) {
        if (value.indexOf(getNumberDecimalPartSeparatorChar()) > -1) {
            return parseFloat(value);
        } else {
            return parseInt(value);
        }
    }

    return undefined;
}

export function getMaxDecimalPlaces(maxDecimalPlaces: number) {
    return isFinite(maxDecimalPlaces) ? maxDecimalPlaces : 0;
}

export function truncateToDecimalPlaces(value: string, maxDecimalPlaces: number) {
  const currentMaxDecimalPlaces = getMaxDecimalPlaces(maxDecimalPlaces);

  if (countDecimals(value) > currentMaxDecimalPlaces) {
      let numberComponents = value.toString().split(getNumberDecimalPartSeparatorChar());
      let decimalPlaces = numberComponents[1].substr(0, currentMaxDecimalPlaces);

      return numberComponents[0] + getNumberDecimalPartSeparatorChar() + decimalPlaces;
  }

  return value;
}

function countDecimals(value: string) {
  const numberParts = value.split(getNumberDecimalPartSeparatorChar());
  return numberParts.length <= 1 ? 0 : numberParts[1].length || 0;
}
