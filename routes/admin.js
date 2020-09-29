const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminContreller');

router.get('/', adminController.viewDashbord);


module.exports = router;