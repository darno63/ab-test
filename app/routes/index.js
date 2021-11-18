const express = require('express');
const fs = require('fs');
const config = fs.existsSync('./app/config.json') ? require('../config.json') : {}
const router = express.Router();

/* Main Site */
router.get('/', (req, res) => {
  res.render('homepage', {
    title: 'Da Beach',
    message: 'Awesome Pics!',
    image1: config.image1 || '/images/default1.jpg',
    image2: config.image2 || '/images/default2.jpg'
  });
});

router.get('/gallery', (req, res) => {
	res.render('gallery', { title: 'Da Bed' });
});

module.exports = router;
