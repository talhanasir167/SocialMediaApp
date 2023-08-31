const express = require('express');
const router = express.Router();

router.get('/index', (req,res) => {
  res.render('chat_index')
})

module.exports = router