const AppDataSource = require('../data-source');
const userRepo = AppDataSource.getRepository('User');

exports.findUserByUsername = async (username) => {
  return await userRepo.findOneBy({ username });
};

exports.createUser = async (username, hashedPassword) => {
  const user = userRepo.create({ username, password: hashedPassword });
  return await userRepo.save(user);
};
