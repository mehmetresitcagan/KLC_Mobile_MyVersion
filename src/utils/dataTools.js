const getValue = (obj = {}, key = '') => {
  if (key === '') {
    return '-';
  }
  if (obj.hasOwnProperty(key)) {
    return isNumeric(obj[key]) ? parseInt(obj[key], 10) : obj[key];
  }
  return '-';
};

function isNumeric(num) {
  return !isNaN(num);
}

export  {
  getValue,
  isNumeric,
};
