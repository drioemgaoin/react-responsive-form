import { isNaN, isEmpty, trim } from 'lodash';

const user_exp = /^([A-Z0-9_%+\-!#$&'*\/=?^`{|}~]+\.?)*[A-Z0-9_%+\-!#$&'*\/=?^`{|}~]+$/i;
const domain_exp = /^([A-Z0-9-]+\.?)*[A-Z0-9-]+(\.[A-Z]{2,9})+$/i;

export default function isValidValueEntered(value: string) {
  if (isEmpty(value)) {
    return 'Email is required';
  }

  if (!hasValidEmail(value)) {
    return 'Email is invalid';
  }

  return null;
}

function hasValidEmail(value: string) {
  const tab = value.split('@');

  if (tab.length != 2)
  {
    return false;
  }

  return (user_exp.test(tab[0]) && domain_exp.test(tab[1]));
}
