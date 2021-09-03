export const luhnCheck = num => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val)),
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
};


export const isDateMonthInvalid = (string) => {
  const month = Number.parseInt(string.substring(0, 2), 10);
  console.log(month);
  if (month < 1 || month > 12) {
    return true;
  }

  return false;
}

export const isDateExpired = (string) => {
  const now = new Date()
  const yearNow = Number.parseInt(now.getFullYear().toString().slice(-2), 10);
  const monthNow = now.getMonth() + 1;

  const monthExpire = Number.parseInt(string.slice(0, 2), 10);
  const yearExpire = Number.parseInt(string.slice(-2), 10);

  console.log(yearNow, monthNow, monthExpire, yearExpire)

  if (yearNow > yearExpire) return true;
  if (yearNow === yearExpire && monthNow > monthExpire) return true;

  return false;
}

export const clearSpaces = (string) => string.replace(/ /g, '');
export const addSpaces = (string) => string.replace(/(.{4})/g, '$1 ');
export const formatDate = string => string.replace(/(.{2})/, '$1/');
export const cleanDate = string => string.split('/').join('');
export const getDigits = string => string.replace(/[^0-9]+/g, '');
export const formatCvc = string => string.replace(/(.)/g, '*')

export const validateCvc = (cvc) => {
  const isEmpty = cvc.length !== 3;
  if (isEmpty) return 'Введите cvc';

  return '';
}

export const validatePan = (pan, isStored = () => false) => {
  const isEmpty = pan.length === 0;
  if (isEmpty) return 'Введите номер карты';

  const isPanNotValid = !luhnCheck(pan);
  if (isPanNotValid) return 'Номер карты не верный'

  if (isStored(pan)) return 'Карта уже была добавлена'

  return '';
}

export const validateDate = (date) => {
  const isEmpty = date.length !== 4;
  if (isEmpty) return 'Введите дату';
  if (isDateMonthInvalid(date)) return 'Первые две цифры указывают месяц (01-12)';
  if (isDateExpired(date)) return 'У карты прошёл срок использования';

  return '';
}