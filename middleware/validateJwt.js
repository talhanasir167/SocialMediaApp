const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User isn't authorized");
      }
      console.log("Token Verified for the User");
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401)
      throw new Error("Unauthorized or Token is missing")
    }
  }
});

module.exports = validateToken;
