const errorMessages = require("../const/error_messages");
const jsonwebToken = require("jsonwebtoken");
const constance = require("../const/constance");
const equal = function(element, role) {
  return element === role || "admin" === role;
};

exports.validate_token = function() {
  return function(req, res, next) {
    if (req.session.token) {
      jsonwebToken.verify(req.session.token, constance.sign, (err, decode) => {
        if (err) {
          res.status(401).json({ success: false, message: "token not fount" });
        } else {
          req.user_id = decode.user_id;
          req.role = decode.role;
          next();
        }
      });
    } else if (!Boolean(req.headers["authorization"])) {
      res.status(401).json({ success: false, message: errorMessages.err_required_token });
    } else {
      jsonwebToken.verify(req.headers.authorization, constance.sign, (err, decode) => {
        if (err) {
          res.status(401).json(errorMessages.err_required_fingerprint_token);
        } else {
          req.user_id = decode.user_id;
          req.role = decode.role;
          next();
        }
      });
    }
  };
};

exports.validate_role = function(role) {
  return function(req, res, next) {
    if (req.user_id) {
      if (role.some(el => equal(el, req.role))) {
        next();
      } else {
        res.status(401).json(errorMessages.permission);
      }
    } else {
      res.status(401).json(errorMessages.invalid_data);
    }
  };
};
