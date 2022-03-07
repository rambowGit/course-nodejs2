const express = require('express')
const router = express.Router()
const { 
  setFavoritSkills,
  updateSkills,
  testDB
} = require('../controllers/adminCtrl');

router.get('/test', testDB);

 
/* 
  TODO: Реализовать, подстановку в поля ввода формы 'Счетчики'
   актуальных значений из сохраненых (по желанию)
*/ 
router.get('/', setFavoritSkills);


/*
  TODO: Реализовать сохранение нового объекта со значениями блока скиллов

  в переменной age - Возраст начала занятий на скрипке
  в переменной concerts - Концертов отыграл
  в переменной cities - Максимальное число городов в туре
  в переменной years - Лет на сцене в качестве скрипача
*/
router.post('/skills', updateSkills);


router.post('/upload', (req, res, next) => {
  /* TODO:
   Реализовать сохранения объекта товара на стороне сервера с картинкой товара и описанием
    в переменной photo - Картинка товара
    в переменной name - Название товара
    в переменной price - Цена товара
    На текущий момент эта информация хранится в файле data.json  в массиве products
  */
  res.send('Реализовать сохранения объекта товара на стороне сервера')
})

module.exports = router
