const express = require('express');
const router = express.Router();

router.get('/index', (req,res) => {
  res.render('chat_views/chat_index')
})

router.get('/openly', (req,res) => {
  res.render('chat_views/chat')
})
module.exports = router