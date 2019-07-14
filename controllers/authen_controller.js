var errorMessages = require('../const/error_messages');
var socketIOClient = require('socket.io-client');
var functions = require('../config/function');
var constance = require('../const/constance');
var response = require('../config/response');
var jsonwebToken = require('jsonwebtoken');
var numeric = require('../const/numeric');
var bcrypt = require('bcryptjs');
var fs = require('fs');

var UserModel = require('../models/UserModel');

exports.login = function() {
  return async function(req, res, next) {
    try {
      let { username, password, noti_token } = req.body;
      let user = await UserModel.getUserByUsername(username);
      if (typeof user[0] !== 'undefined') {
        if (bcrypt.compareSync(password, user[0].password)) {
          noti_token ? await UserModel.updateUser({ noti_token }, user[0].user_id) : null;
          req.result = {
            user_id: user[0].user_id,
            username: user[0].username,
            name: user[0].th_name,
            lastname: user[0].th_lastname,
            role: user[0].role_name,
            email: user[0].email,
            picture: user[0].picture,
            token: jsonwebToken.sign({ user_id: user[0].user_id, role: user[0].role_name }, constance.sign, {
              expiresIn: '8h'
            }),
            noti_token: noti_token
          };
          next();
        } else {
          res.status(200).json(errorMessages.err_wrong_password);
        }
      } else {
        res.status(200).json(errorMessages.err_user_not_found);
      }
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};

exports.logout = function() {
  return async function(req, res, next) {
    try {
      req.session = null;
      await UserModel.updateUser({ noti_token: null }, req.user_id);
      next();
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};

exports.create_admin = function() {
  return async function(req, res, next) {
    try {
      let user = await UserModel.getUserByUsernameAndCitizenID(req.body.username, req.body.citizen_id);
      if (typeof user[0] === 'undefined') {
        var profileInfo = {
          username: req.body.username,
          password: numeric.encrypt(req.body.password),
          role_id: 1,
          en_prefix: req.body.en_prefix || '',
          en_name: req.body.en_name || '',
          en_lastname: req.body.en_lastname || '',
          th_prefix: req.body.th_prefix || '',
          th_name: req.body.th_name || '',
          th_lastname: req.body.th_lastname || '',
          citizen_id: req.body.citizen_id || null,
          sex: functions.convert_sex(req.body.sex),
          phone: req.body.phone || '',
          birthday: req.body.birthday || null,
          religion: req.body.religion || '',
          issue: req.body.issue || null,
          expire: req.body.expire || null,
          address: req.body.address || '',
          email: req.body.email || '',
          picture: req.file ? req.file.filename : ''
        };
        let insertUser = await UserModel.insertUser(profileInfo);
        if (insertUser) {
          req.result = {
            username: profileInfo.username,
            password: req.body.password
          };
          next();
        }
      } else {
        res.status(200).json({ success: false, message: 'username หรือหมายเลขบัตรประชาชนนี้ถูกใช้ไปแล้ว' });
      }
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};

exports.create_user = function() {
  return async function(req, res, next) {
    try {
      let checkForeigner = typeof req.body.foreigner !== 'undefined' && req.body.foreigner !== '0';
      // let hn = await functions.gen_hn(req.body.hn);
      let profileInfo = {
        user_create_id: req.user_id,
        // hn: hn,
        role_id: req.body.role_id,
        username: req.body.role_id === '6' ? req.body.citizen_id : req.body.username,
        password: numeric.encrypt(req.body.password),
        foreigner: checkForeigner ? 1 : 0,
        nationality: checkForeigner ? req.body.nationality : 'Thai',
        en_prefix: req.body.en_prefix || '',
        en_name: req.body.en_name || '',
        en_lastname: req.body.en_lastname || '',
        th_prefix: checkForeigner ? req.body.en_prefix || '' : req.body.th_prefix || '',
        th_name: checkForeigner ? req.body.en_name || '' : req.body.th_name || '',
        th_lastname: checkForeigner ? req.body.en_lastname || '' : req.body.th_lastname || '',
        citizen_id: req.body.citizen_id || '',
        sex: functions.convert_sex(req.body.sex),
        phone: req.body.phone || '',
        birthday: req.body.birthday || null,
        religion: req.body.religion || '',
        issue: req.body.issue || null,
        expire: req.body.expire || null,
        allergy: req.body.allergy || '',
        congenital_disease: req.body.congenital_disease || '',
        address: req.body.address || '',
        email: req.body.email || '',
        picture: req.file ? req.file.filename : ''
      };
      let user = await UserModel.getUserByUsernameAndCitizenID(profileInfo.username, profileInfo.citizen_id);
      if (typeof user[0] === 'undefined') {
        let insertUser = await UserModel.insertUser(profileInfo);
        if (insertUser) {
          req.result = {
            user_id: insertUser[0],
            hn: convert_digits(insertUser[0], 7),
            username: profileInfo.username,
            role_id: profileInfo.role_id,
            foreigner: profileInfo.foreigner,
            nationality: profileInfo.nationality,
            en_prefix: profileInfo.en_prefix,
            en_name: profileInfo.en_name,
            en_lastname: profileInfo.en_lastname,
            th_prefix: profileInfo.th_prefix,
            th_name: profileInfo.th_name,
            th_lastname: profileInfo.th_lastname,
            citizen_id: profileInfo.citizen_id,
            sex: profileInfo.sex,
            phone: profileInfo.phone,
            birthday: profileInfo.birthday,
            religion: profileInfo.religion,
            issue: profileInfo.issue,
            expire: profileInfo.expire,
            allergy: profileInfo.allergy,
            congenital_disease: profileInfo.congenital_disease,
            address: profileInfo.address,
            picture: profileInfo.picture
          };
          socketIOClient(constance.endpoint).emit('rerender', { success: true, type: 'create_user' });
          next();
        }
      } else {
        res.status(200).json({
          success: false,
          message: 'username หรือหมายเลขบัตรประชาชนนี้ถูกใช้ไปแล้ว',
          user_id: user[0].user_id
        });
      }
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};

exports.sign_up = function() {
  return async function(req, res, next) {
    try {
      let checkForeigner = typeof req.body.foreigner !== 'undefined' && req.body.foreigner !== '0';
      let profileInfo = {
        role_id: 6,
        username: req.body.citizen_id,
        password: numeric.encrypt(req.body.password),
        foreigner: checkForeigner ? 1 : 0,
        nationality: checkForeigner ? req.body.nationality : 'Thai',
        en_prefix: req.body.en_prefix || '',
        en_name: req.body.en_name || '',
        en_lastname: req.body.en_lastname || '',
        th_prefix: checkForeigner ? req.body.en_prefix || '' : req.body.th_prefix || '',
        th_name: checkForeigner ? req.body.en_name || '' : req.body.th_name || '',
        th_lastname: checkForeigner ? req.body.en_lastname || '' : req.body.th_lastname || '',
        citizen_id: req.body.citizen_id || null,
        sex: functions.convert_sex(req.body.sex),
        phone: req.body.phone || '',
        birthday: req.body.birthday || null,
        religion: req.body.religion || '',
        issue: req.body.issue || null,
        expire: req.body.expire || null,
        allergy: req.body.allergy || '',
        congenital_disease: req.body.congenital_disease || '',
        address: req.body.address || '',
        email: req.body.email || '',
        confirm: 0
      };
      let user = await UserModel.getUserByUsernameAndCitizenID(profileInfo.username, profileInfo.citizen_id);
      if (typeof user[0] === 'undefined') {
        let insertUser = await UserModel.insertUser(profileInfo);
        if (insertUser) {
          socketIOClient(constance.endpoint).emit('rerender', { success: true, type: 'sign_up' });
          next();
        }
      } else {
        res.status(200).json({
          success: false,
          message: 'username หรือหมายเลขบัตรประชาชนนี้ถูกใช้ไปแล้ว',
          user_id: user[0].user_id
        });
      }
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};

exports.confirm_customer = function() {
  return async function(req, res, next) {
    try {
      // let hn = await functions.gen_hn(req.params.hn);
      let userInfo = { confirm: 1 };
      let updateUser = await UserModel.updateUser(userInfo, req.params.id);
      if (updateUser) {
        socketIOClient(constance.endpoint).emit('rerender', { success: true, type: 'confirm_user' });
        next();
      }
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};

exports.delete_customer = function() {
  return async function(req, res, next) {
    try {
      let deleteUser = await UserModel.deleteUser(req.params.id);
      if (deleteUser) {
        socketIOClient(constance.endpoint).emit('rerender', { success: true, type: 'delete_user' });
        next();
      } else {
        res.status(200).json({ success: false, message: 'ไม่พบผู้ใช้ที่ต้องการลบข้อมูล' });
      }
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};

exports.update_profile = function() {
  return async function(req, res, next) {
    try {
      let user = await UserModel.getUserByID(req.user_id);
      if (typeof user[0] !== 'undefined') {
        let userProfile = {
          en_prefix: req.body.en_prefix || user[0].en_prefix,
          en_name: req.body.en_name || user[0].en_name,
          en_lastname: req.body.en_lastname || user[0].en_lastname,
          th_prefix: req.body.th_prefix || user[0].th_prefix,
          th_name: req.body.th_name || user[0].th_name,
          th_lastname: req.body.th_lastname || user[0].th_lastname,
          birthday: req.body.birthday || user[0].birthday,
          phone: req.body.phone || user[0].phone,
          address: req.body.address || user[0].address,
          foreigner: req.body.foreigner || user[0].foreigner,
          nationality: req.body.nationality || user[0].nationality,
          religion: req.body.religion || user[0].religion,
          sex: req.body.sex || user[0].sex,
          email: req.body.email || user[0].email,
          allergy: req.body.allergy || user[0].allergy,
          congenital_disease: req.body.congenital_disease || user[0].congenital_disease,
          issue: req.body.issue || user[0].issue,
          expire: req.body.expire || user[0].expire,
          picture: req.file ? req.file.filename : user[0].picture
        };
        let updateUser = await UserModel.updateUser(userProfile, req.user_id);
        if (updateUser) {
          req.result = userProfile;
          let oldPicName = user[0].picture;
          if (req.file && oldPicName) {
            fs.unlink(`./images/profiles/${oldPicName}`, function(err) {
              console.log(err);
            });
          }
          socketIOClient(constance.endpoint).emit('rerender', { success: true, type: 'update_profile' });
          next();
        }
      } else {
        res.status(200).json({ success: false, message: 'ไม่พบผู้ใช้ที่ต้องการแก้ไขข้อมูล' });
      }
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};

exports.update_user_profile = function() {
  return async function(req, res, next) {
    try {
      let user = await UserModel.getUserByID(req.body.user_id);
      if (typeof user[0] !== 'undefined') {
        var userProfile = {
          citizen_id: req.body.citizen_id || user[0].citizen_id,
          // hn: req.body.hn ? req.body.hn : user[0].hn,
          en_prefix: req.body.en_prefix || user[0].en_prefix,
          en_name: req.body.en_name || user[0].en_name,
          en_lastname: req.body.en_lastname || user[0].en_lastname,
          th_prefix: req.body.th_prefix || user[0].th_prefix,
          th_name: req.body.th_name || user[0].th_name,
          th_lastname: req.body.th_lastname || user[0].th_lastname,
          birthday: req.body.birthday || user[0].birthday,
          phone: req.body.phone || user[0].phone,
          foreigner: req.body.foreigner || user[0].foreigner,
          nationality: req.body.nationality || user[0].nationality,
          religion: req.body.religion || user[0].religion,
          sex: req.body.sex || user[0].sex,
          picture: req.file ? req.file.filename : user[0].picture,
          address: req.body.address || user[0].address,
          email: req.body.email || user[0].email,
          allergy: req.body.allergy || user[0].allergy,
          congenital_disease: req.body.congenital_disease || user[0].congenital_disease,
          issue: req.body.issue || user[0].issue,
          expire: req.body.expire || user[0].expire
        };
        let updateUser = await UserModel.updateUser(userProfile, req.body.user_id);
        if (updateUser) {
          req.result = userProfile;
          if (req.file && user[0].picture) {
            var oldPicName = user[0].picture;
            fs.unlink(`./images/profiles/${oldPicName}`, function(err) {
              console.log(err);
            });
          }
          socketIOClient(constance.endpoint).emit('rerender', { success: true, type: 'update_profile' });
          next();
        }
      } else {
        res.status(200).json({ success: false, message: 'ไม่พบผู้ใช้ที่ต้องการแก้ไขข้อมูล' });
      }
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};

exports.change_password = function() {
  return async function(req, res, next) {
    try {
      let user = await UserModel.getUserByID(req.user_id);
      if (typeof user[0] !== 'undefined') {
        if (bcrypt.compareSync(req.body.old_password, user[0].password)) {
          let new_password = numeric.encrypt(req.body.new_password);
          let updateUser = await UserModel.updateUser({ password: new_password }, req.user_id);
          if (updateUser) {
            next();
          }
        } else {
          res.status(200).json(errorMessages.err_wrong_password_change);
        }
      } else {
        res.status(200).json(errorMessages.err_user_not_found);
      }
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};

exports.check_reset_password = function() {
  return async function(req, res, next) {
    try {
      let user = await UserModel.checkResetPass(req.body.name, req.body.lastname, req.body.citizen_id);
      if (typeof user[0] !== 'undefined') {
        req.user_id = user[0].user_id;
        next();
      } else {
        res.status(200).json({ success: false, message: 'ข้อมูลไม่ถูกต้อง' });
      }
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};

exports.reset_password = function() {
  return async function(req, res, next) {
    try {
      let updateUser = await UserModel.updateUser({ password: numeric.encrypt(req.body.password) }, req.body.user_id);
      if (updateUser) {
        next();
      } else {
        res.status(200).json({ success: false, message: 'ไม่พบผู้ใช้' });
      }
    } catch (err) {
      response.failed(res, err, 'ผิดพลาด');
    }
  };
};
