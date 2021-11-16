const express = require('express');
const router = express.Router();

/* Main Site */
router.get('/', (req, res) => {
  res.render('homepage', { title: 'Da Beach', message: 'Awesome Pics!' });
});

router.get('/gallery', (req, res) => {
	res.render('gallery', { title: 'Da Bed' });
});

module.exports = router;
