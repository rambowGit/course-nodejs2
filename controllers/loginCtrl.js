const dbConnector = require('../security/passwdConnector');

const db = dbConnector();


/*
 Middleware check cookie key isAdmin
 */
const isAdmin = (req, res, next) => {
  // if cookie contains isAdmin
  if (req.session.isAdmin) {
    // go to next route
    return next()
  }
  // default behavior
  res.redirect(301, '/?msg=Неправильный логин или пароль!')
  //res.send('Неправильный логин или пароль!');
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
    return res.redirect(`/admin?msglogin=${valid.status}`); //TODO
  }

  // get credential from DB
  try {
    // DB init
    await db.read();
    let dbCredential  = db.data?.credential;    
    console.log("db.data: ", db.data);
    
    if ((enteredEmail === dbCredential.email) && (enteredPasswd === dbCredential.password)){
      console.log("Логин и пароль совпали", dbCredential.email, dbCredential.password);

      req.session.isAdmin = true
      res.redirect('/admin?msglogin=Аутентификция пройдена!');   
    } else {
      res.send(`логин или пароль не верны: ${enteredEmail}, ${enteredPasswd}`);
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
  res.render('pages/login', { title: 'SigIn page' });
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