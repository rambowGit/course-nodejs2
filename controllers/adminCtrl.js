const express = require('express')
const path = require('path'); 
const { products, skills } = require('../database/data-copy.json');
const dbConnector = require('../database/dbConfig');

const db = dbConnector();

/*
show faworit skills value in web-form
*/
const setFavoritSkills = (req, res) => { 
  res.render('pages/admin', { title: 'Admin page', skills} );
}


/*
test DB http://localhost:3000/admin/test
*/
const testDB = async (req, res) => {

  try {
    // инициализируем БД
    await db.read();
    let skills = db.data?.skills;
    if (skills) {
      // отправляем данные клиенту
      res.status(200).json(skills);
    } else {
      // сообщаем об отсутствии задач
      res.status(200).json({ message: 'There are no data.' })
    }
  } catch (e) {
    // фиксируем локацию возникновения ошибки
    console.error('There is DB error: ', e);
  }
}


  /*
  Update all skills
  */
  const updateSkills = async (req, res, next) => {

    try {
      // инициализируем БД
      await db.read();

      // создаем новую задачу
      const updatedSkills = req.body; // from express.urlencoded in app.js

      let skills = db.data?.skills;
      
      // помещаем ее в массив
      skills[0].number = updatedSkills.age;
      skills[1].number = updatedSkills.concerts;
      skills[2].number = updatedSkills.cities;
      skills[3].number = updatedSkills.years;

      // фиксируем изменения
      await db.write();
      // возвращаем обновленный массив
      res.status(201);
      res.redirect('/');
    } catch (e) {
        console.error('Error while update skills: ', e)
      }    
  }


module.exports = {
  setFavoritSkills,
  updateSkills,
  testDB
}
