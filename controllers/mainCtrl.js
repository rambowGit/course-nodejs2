const mailHandler = require('../mail/mail.js');
const dbConnector = require('../database/dbConfig');
const db = dbConnector();



const getCurrentSkillsAndProducts = async () => {
  await db.read();
  return {
    skills: db.data.skills,
    products:  db.data.products
  }
}

/*
Show favorite skills value in web-form
Default GET controller for /admin
*/
const getAllData = async (req, res) => {  
  const dbValue = await getCurrentSkillsAndProducts();
  const products = dbValue.products;
  const skills = dbValue.skills;
    //console.log("skills: ", skills);
    res.render('pages/index', { 
      title: 'Main page', 
      products, 
      skills, 
      msgemail: req.query.msgemail})
};
 


// const getAllData = (req, res) => {
//   res.render('pages/index', { 
//     title: 'Main page', 
//     products, 
//     skills, 
//     msgemail: req.query.msgemail 
//   })
// }

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
