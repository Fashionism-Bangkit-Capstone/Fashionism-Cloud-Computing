const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authType = authHeader && authHeader.split(' ')[0];
  const token = authHeader && authHeader.split(' ')[1];

  if (authType !== 'Bearer') {
    return res.status(403).send({
      error: true,
      message: 'Invalid token!',
    });
  }

  if (!token) {
    return res.status(403).send({
      error: true,
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: true,
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
