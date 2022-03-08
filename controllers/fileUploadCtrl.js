const multer  = require('multer');
const path = require('path'); 
const uuid = require('uuid').v4;
const dbConnector = require('../database/dbConfig');
const prefix = uuid();
const fs = require('fs');


/**
 * DB connection
 */
const db = dbConnector();
const destPath = path.join(process.cwd(), 'public', 'assets','img', 'products');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, destPath)
  },
  filename: (req, file, cb) => {
      const { originalname } = file;

      cb(null, `${prefix}-${originalname}`);
  },
})
// used in router via export
const upload = multer({ storage });


/*
 DB update
 msgfile - HTML-message after upload, see skillsCtrl.setFavoritSkills
 */
 const addProduct = async (req, res) => {
 
  try {
    await db.read();

    // create new product
    let products = db.data?.products;
    const {name, price} = req.body;
    const src = path.join('assets','img', 'products', `${prefix}-${req.file.originalname}`);
    const fields = {src, name, price};
    
    // check fields
    const valid = validation(fields, req.file);
    if (valid.err) {
      return res.redirect(`/admin?msgfile=${valid.status}`);
    }
    
    products.push(fields);
    // will be redirected to skillsCtrl.setFavoritSkills controller, as default GET controller for /admin
    res.redirect('/admin?msgfile=Товар успешно добавлен'); 
  
    // update DB
    await db.write();


  } catch (e) {
    console.error('Error while upload file: ', e)
    }    
}

/**
 * 
 * @param {*} fields from web-form
 * @param {*} files from web-form
 * @returns validation result
 */
const validation = (fields, file) => {
  if (file.originalname === '' || file.size === 0) {
    return { status: 'Не загружено изображение!', err: true }
  }
  if (!fields.name) {
    return { status: 'Не указано название товара!', err: true }
  }
  if (!fields.price) {
    return { status: 'Не указана стоимость товара!', err: true }
  }
  return { status: 'Ok', err: false }
}


module.exports = {upload, addProduct};
