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


export const isDateMMYY = (string) => {
  if (!/\d\d\d\d/.test(string)) {
    return false;

  }

  return true;
}

export const isDateMonthValid = (string) => {
  const month = string.substring(0, 2);
  if (month < 1 || month > 12) {
    return false;
  }

  return true;

}

export const isDateExpired = (string) => {
  const now = new Date()
  const month = string.substring(0, 2);
  const year = now.getFullYear() / 100 | 0 + '';
  if (new Date(year + month[1], month[0], 1) < now) {
    return false;
  }
  return true;

}
