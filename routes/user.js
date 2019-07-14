var authUtil = require('../controllers/authen_controller');
var upload = require('../middleware/uploadProfiles');
var validator = require('../middleware/validator');
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/create_admin', upload.single('fileData'), authUtil.create_admin(), function(req, res) {
  res.status(200).json({ success: true, result: req.result, message: 'สร้างแอดมินสำเร็จ' });
}); // done

router.post(
  '/create_user',
  validator.validate_token(),
  validator.validate_role(['frontMT', 'frontPT', 'mt', 'pt']),
  upload.single('fileData'),
  authUtil.create_user(),
  function(req, res) {
    res.status(200).json({ success: true, message: 'สร้างผู้ใช้สำเร็จ', result: req.result });
  }
); // done

router.post('/sign_up', authUtil.sign_up(), function(req, res) {
  res.status(200).json({ success: true, message: 'ลงทะเบียนสำเร็จ' });
}); // done

router.get(
  '/confirm_customer/:id',
  validator.validate_token(),
  validator.validate_role(['frontMT', 'frontPT', 'mt', 'pt']),
  authUtil.confirm_customer(),
  function(req, res) {
    res.status(200).json({ success: true, message: 'ยืนยันผู้ใช้สำเร็จ' });
  }
); // done

router.get(
  '/delete_customer/:id',
  validator.validate_token(),
  validator.validate_role(['frontMT', 'frontPT', 'mt', 'pt']),
  authUtil.delete_customer(),
  function(req, res) {
    res.status(200).json({ success: true, message: 'ลบผู้ใช้สำเร็จ' });
  }
); // done

router.post('/login', authUtil.login(), function(req, res) {
  req.session.token = req.result.token;
  res.status(200).json({ success: true, result: req.result, message: 'เข้าสู่ระบบสำเร็จ' });
}); // done

router.get('/logout', validator.validate_token(), authUtil.logout(), function(req, res) {
  res.status(200).json({ success: true, message: 'ออกจากระบบสำเร็จ' });
}); // done

router.post(
  '/update_profile',
  validator.validate_token(),
  upload.single('fileData'),
  authUtil.update_profile(),
  function(req, res) {
    res.status(200).json({ success: true, message: 'แก้ไขข้อมูลสำเร็จ', result: req.result });
  }
); // done

router.post(
  '/update_user_profile',
  validator.validate_token(),
  validator.validate_role(['frontMT', 'frontPT', 'mt', 'pt']),
  upload.single('fileData'),
  authUtil.update_user_profile(),
  function(req, res) {
    res.status(200).json({ success: true, message: 'แก้ไขข้อมูลสำเร็จ', result: req.result });
  }
); // done

router.post('/change_password', validator.validate_token(), authUtil.change_password(), function(req, res) {
  res.status(200).json({ success: true, message: 'เปลี่ยนรหัสผ่านสำเร็จ' });
}); // done

router.post('/check_reset_password', authUtil.check_reset_password(), function(req, res) {
  res.status(200).json({ success: true, message: 'ข้อมูลถูกต้อง', result: { user_id: req.user_id } });
}); // done

router.post('/reset_password', authUtil.reset_password(), function(req, res) {
  res.status(200).json({ success: true, message: 'รีเซ็ตรหัสผ่านสำเร็จ' });
}); // done

router.get('/avatar/:id', function(req, res) {
  fs.readFile(__dirname.replace('routes', '') + '/images/profiles/' + req.params.id, (err, data) => {
    err
      ? res.sendFile(__dirname.replace('routes', '') + '/images/profiles/default.png')
      : res.sendFile(__dirname.replace('routes', '') + `/images/profiles/${req.params.id}`);
  });
}); // done

module.exports = router;
