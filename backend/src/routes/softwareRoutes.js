const express = require('express');
const router = express.Router();
const softwareController = require('../controllers/softwareController');
const { authMiddleware } = require('../middlewares/auth');

router.post('/', authMiddleware, softwareController.createSoftware);

module.exports = router;

