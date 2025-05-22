const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppDataSource = require('../data-source');
const userRepo = AppDataSource.getRepository('User');
const { generateToken } = require('../utils/jwt');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingUser = await userRepo.findOneBy({ username });
      if (existingUser) return res.status(400).json({ message: 'Username already exists' });
  
      const hashed = await bcrypt.hash(password, 10);
      const user = userRepo.create({ username, password: hashed });
      await userRepo.save(user);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Signup error:', error.message, error.stack);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userRepo.findOneBy({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
