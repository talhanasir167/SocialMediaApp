const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
  let token = null;

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    console.log("in header token")
    token = authHeader.split(' ')[1];
  } else if(req.query.token){
    console.log("in query token")
    token = req.query.token;
  }
  else {
    console.log("in cookies token")
    const cookies = req.headers.cookie ? req.headers.cookie.split('; ') : [];
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === 'authorization') {
        token = cookieValue;
        break;
      }
    }
  }

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User isn't authorized");
      }
      console.log('Token Verified for the User');
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error('Unauthorized or Token is missing');
  }
});

module.exports = validateToken;
