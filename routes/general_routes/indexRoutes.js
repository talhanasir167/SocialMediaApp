const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render('general_views/index');
});

router.get('/register', (req, res) => {
  res.render('general_views/register');
});

router.get('/login', (req, res) => {
  res.render('general_views/login');
});

module.exports = router;
