const express = require('express');
const { register, login } = require('../controller/userController');
const validateToken = require('../middleware/validateJwt');
const router = express.Router();

router.post('/register', register)

router.post('/login', login)

router.get('/jwttest', validateToken, (req, res) => {
  res.send("Hello I'm in JWT Test")
})

module.exports = router;