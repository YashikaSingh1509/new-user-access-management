const AppDataSource = require('../data-source');
const requestRepo = AppDataSource.getRepository('Request');

exports.submitRequest = async (req, res) => {
  const { softwareId, accessType, reason } = req.body;
  try {
    const request = requestRepo.create({
      user: { id: req.user.id },
      software: { id: softwareId },
      accessType,
      reason,
    });
    await requestRepo.save(request);
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

