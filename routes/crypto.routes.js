const express = require('express');
const router = express.Router();
const {getDeviation, getStats} = require('../controllers/crypto.controller');

router.get('/stats',getStats);
router.get('/deviation', getDeviation);

module.exports = router;