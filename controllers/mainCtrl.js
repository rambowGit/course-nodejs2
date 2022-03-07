const express = require('express')
const { products, skills } = require('../database/data-copy.json')
const mailHandler = require('../mail/mail.js');
const dbConnector = require('../database/dbConfig');

const db = dbConnector();


const getAllData = (req, res) => {
  res.render('pages/index', { title: 'Main page', products, skills })
}

/*
to send email from web-form
*/
const sendWebMail = (req, res) => {
  const userForm = req.body; // from express.urlencoded in app.js
  mailHandler(userForm).catch(console.error);
  res.render('pages/index', { title: 'Main page', products, skills })
}

module.exports = {
  getAllData,
  sendWebMail
}
