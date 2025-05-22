const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const softwareRoutes = require('./softwareRoutes');
const requestRoutes = require('./requestRoutes');

router.use('/auth', authRoutes);
router.use('/software', softwareRoutes);
router.use('/request', requestRoutes);

module.exports = router;

