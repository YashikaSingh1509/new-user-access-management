const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { authMiddleware } = require('../middlewares/auth');

router.post('/', authMiddleware, requestController.submitRequest);

module.exports = router;


