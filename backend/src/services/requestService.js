const AppDataSource = require('../data-source');
const requestRepo = AppDataSource.getRepository('Request');

exports.createRequest = async (userId, softwareId, accessType, reason) => {
  const request = requestRepo.create({
    user: { id: userId },
    software: { id: softwareId },
    accessType,
    reason,
  });
  return await requestRepo.save(request);
};

exports.updateRequestStatus = async (id, status) => {
  const request = await requestRepo.findOne({ where: { id }, relations: ['user', 'software'] });
  if (!request) return null;
  request.status = status;
  return await requestRepo.save(request);
};