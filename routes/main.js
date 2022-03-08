const express = require('express')
const router = express.Router()
const {getAllData, sendWebMail} = require('../controllers/mainCtrl');



router.get('/', getAllData);

router.post('/', sendWebMail);

module.exports = router
