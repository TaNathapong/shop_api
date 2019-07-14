var moment = require('moment');

exports.convert_digits = (n, digit) => {
  var string = '0000000';
  var length = digit - n.toString().length;
  var trimmedString = string.substring(0, length);
  return trimmedString + n.toString();
};
