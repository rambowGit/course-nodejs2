const express = require('express')
const { products, skills } = require('../database/data-copy.json')
const mailHandler = require('../mail/mail.js');
const fs = require('fs');


const getAllData = (req, res) => {
  res.render('pages/index', { 
    title: 'Main page', 
    products, 
    skills, 
    msgemail: req.query.msgemail 
  })
}

/*
to send email from web-form
*/
const sendWebMail = (req, res) => {
  const userForm = req.body; // from express.urlencoded in app.js
  
  // check form
  const valid = validation(userForm);
  if (valid.err) {
    return res.redirect(`/?msgemail=${valid.status}`)
  }
  
  mailHandler(userForm)
  .then(()=>{
    res.redirect('/?msgemail=Письмо успешно отправлено!')
  })  
  .catch(console.error);      
}

/**
 * 
 * @param {*} fields from web-form
 * @param {*} files from web-form
 * @returns validation result
 */
 const validation = (fields) => {
  
  if (!fields.name) {
    return { status: 'Укажите свое имя!', err: true }
  }
  if (!fields.email) {
    return { status: 'Укажите свой адрес электронной почты!', err: true }
  }
  if (!fields.message) {
    return { status: 'Напишите что-нибудь =)', err: true }
  }
 
  return { status: 'Ok', err: false }
}

module.exports = {
  getAllData,
  sendWebMail
}
