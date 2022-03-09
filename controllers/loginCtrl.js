const dbConnector = require('../security/passwdConnector');

const db = dbConnector();


/*
 Middleware check cookie key isAdmin
 */
const isAdmin = (req, res, next) => {
  // if cookie contains isAdmin
  if (req.session.isAdmin) {
    // go to next route
    return next();
  }
  // default behavior
  res.redirect('/login?msglogin=Введите логин (ваш email) или пароль!')
}

/*
Check user
*/
const loginHandler = async (req, res) => {
  
  // get credential from web-form (express.urlencoded in app.js)
  const userCreds = req.body;
  let buff = Buffer.from(userCreds.password);
  let enteredPasswd = buff.toString('base64');
  let enteredEmail = userCreds.email
  
  // validation
  const valid = validation(userCreds);
  if (valid.err) {
    return res.redirect(`/login?msglogin=${valid.status}`); 
  }

  // get credential from DB
  try {
    // DB init
    await db.read();
    let dbCredential  = db.data?.credential;        
    if ((enteredEmail === dbCredential.email) && (enteredPasswd === dbCredential.password)){

      req.session.isAdmin = true
      res.redirect('/admin?msglogin=Аутентификция пройдена!');   
    } else {
      res.redirect('/admin?msglogin=Аутентификция не пройдена!'); 
    }   
      
  } catch (e) {
      console.error('Error while login: ', e);
    }    
}

/*
If isAdim, go to admin page controller (see router is Admin middleware)
*/
const getAdminPage = (req, res) => {
  res.redirect(301, '/admin');
}

/*
 Else need login
*/
const getLoginPage = (req, res) => {
  console.log("getLoginPage activated: ", req.query.msglogin);
  res.render('pages/login', { 
    title: 'SigIn page',
    msglogin: req.query.msglogin,
    msglogin: req.query.msglogin });
}


/**
 * 
 * @param {*} fields from web-form
 * @param {*} files from web-form
 * @returns validation result
 */
 const validation = (fields) => {
  
  if (!fields.email) {
    return { status: 'Укажите свой адрес электронной почты!', err: true }
  }
  if (!fields.password) {
    return { status: 'Не указан пароль!', err: true }
  }
  return { status: 'Ok', err: false }
}

module.exports = {
  isAdmin,
  loginHandler,
  getAdminPage,
  getLoginPage
}