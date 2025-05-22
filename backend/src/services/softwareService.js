const AppDataSource = require('../data-source');
const softwareRepo = AppDataSource.getRepository('Software');

exports.addSoftware = async (name, description, accessLevels) => {
  const software = softwareRepo.create({ name, description, accessLevels });
  return await softwareRepo.save(software);
};