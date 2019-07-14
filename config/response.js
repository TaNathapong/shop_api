/**
 * success response
 * @param {Object} res
 * @param {*} result
 * @param {Number} code
 */
const _success = (res, result, code) => res.status(code || 200).json({ success: true, result });

/**
 * failed response
 * @param {Object} res
 * @param {*} err
 * @param {*} message
 * @param {Number} code
 */
const _failed = (res, err, message, code) => {
  console.log(err);
  res.status(code || 400).json({ success: false, message });
};

exports.success = _success;
exports.failed = _failed;
