const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined');
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

