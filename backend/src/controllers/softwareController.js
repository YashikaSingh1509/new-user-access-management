const AppDataSource = require('../data-source');
const softwareRepo = AppDataSource.getRepository('Software');

exports.createSoftware = async (req, res) => {
  const { name, description, accessLevels } = req.body;
  try {
    const software = softwareRepo.create({
      name,
      description,
      accessLevels: accessLevels ? accessLevels.join(',') : null,
    });
    await softwareRepo.save(software);
    res.json(software);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

