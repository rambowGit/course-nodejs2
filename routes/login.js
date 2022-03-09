const express = require('express');
const router = express.Router();
const {isAdmin, loginHandler, getAdminPage, getLoginPage} = require('../controllers/loginCtrl');


router.get('/', getLoginPage);

// TODO: Реализовать функцию входа в админ панель по email и паролю
router.post('/', loginHandler);

module.exports = router
