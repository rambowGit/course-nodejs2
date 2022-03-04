const express = require('express')
const router = express.Router()
const { products, skills } = require('../data.json')

/*
 middleware for web-form handling
 used in router.post
*/
express().use(express.urlencoded({ extended: false }));

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills })
})

router.post('/', (req, res, next) => {
  
  const userForm = req.body;
  res.render('pages/userpage', {userForm});
})

module.exports = router
