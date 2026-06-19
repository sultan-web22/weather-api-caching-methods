const express =require('express');
const router = express.Router()
const {Weatherfunction} = require('../controllers/WeatherController');

router.get('/', Weatherfunction);

module.exports = router ;
