const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../Middleware/middleWare');
const University = require('../Modules/UniversitySchema.js');

router.get('/adminDashBoard', async (req, res) => {
    console.log("Admin Dashboard API hit");


});

module.exports = router;
