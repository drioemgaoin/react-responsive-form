import { isEmpty, trim } from 'lodash';

const user_exp = /^([A-Z0-9_%+\-!#$&'*\/=?^`{|}~]+\.?)*[A-Z0-9_%+\-!#$&'*\/=?^`{|}~]+$/i;
const domain_exp = /^([A-Z0-9-]+\.?)*[A-Z0-9-]+(\.[A-Z]{2,9})+$/i;

export default function validate(value) {
  let errors = [];
  
  if (!isEmpty(trim(value)) && !hasValidEmail(value)) {
      errors.push('Email is invalid');
  }

  return errors;
}

function hasValidEmail(value) {
  const tab = value.split('@');

  if (tab.length != 2)
  {
    return false;
  }

  return (user_exp.test(tab[0]) && domain_exp.test(tab[1]));
}
