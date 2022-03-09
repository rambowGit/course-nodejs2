const { products, skills } = require('../database/data-copy.json');
const dbConnector = require('../database/dbConfig');
const fs = require('fs');


const db = dbConnector();

/*
Show faworit skills value in web-form
Default GET controller for /admin
*/
const setFavoritSkills = (req, res) => { 
  res.render('pages/admin', { 
    title: 'Admin page',
    skills, 
    msgskill: req.query.msgskill,
    msgfile: req.query.msgfile} );
  }


/*
Update all skills
*/

const updateSkills = async (req, res) => {   
  // DB
  try {
    // DB init
    await db.read();

    const updatedSkills = req.body; // from express.urlencoded in app.js
    // validation
    const valid = validation(updatedSkills);
    if (valid.err) {
      return res.redirect(`/?msgskill=${valid.status}`);
    }

    let skills = db.data?.skills;
    
    // create new skills
    skills[0].number = updatedSkills.age;
    skills[1].number = updatedSkills.concerts;
    skills[2].number = updatedSkills.cities;
    skills[3].number = updatedSkills.years;    
   
    // save  
    await db.write();
    // will be redirected to skillsCtrl.setFavoritSkills controller, as default GET controller for /admin
    res.redirect('/admin?msgskill=Скилы успешно обновлены!');   
  
  } catch (e) {
      console.error('Error while update skills: ', e);
    }    
}


 /**
 * 
 * @param {*} fields from web-form
 * @param {*} files from web-form
 * @returns validation result
 */
const validation = (fields) => {
  
  if (!fields.age) {
    return { status: 'Не указан возраст!', err: true }
  }
  if (!fields.concerts) {
    return { status: 'Не указано кол-во концертов!', err: true }
  }
  if (!fields.cities) {
    return { status: 'Не указано кол-во городов!', err: true }
  }
  if (!fields.years) {
    return { status: 'Не указано кол-во лет!', err: true }
  }
  return { status: 'Ok', err: false }
}


module.exports = {
  setFavoritSkills,
  updateSkills,
}
