const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../Middleware/middleWare');
const University = require('../Modules/UniversitySchema.js');

router.get('/', checkAuthenticated,async (req, res) => {
    try {
      const universities = await University.find({});
      res.json(universities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/filter', async (req, res) => {
  try {
    const { major, sortBy, order } = req.query;

    if (!major) {
      return res.status(400).json({ error: "Major is required for filtering." });
    }

    const query = { 'majorsAvailable.name': { $regex: major, $options: 'i' } };
  
    let universities =await University.find(query);
    
    if (sortBy === 'tuitionFees') {
        
      for (let i = 0; i < universities.length; i++) {
        const filteredMajors= universities[i].majorsAvailable.filter(majorName => majorName.name === major)
        universities[i].majorsAvailable= filteredMajors
     }
     const sortOrder = order === 'desc' ? -1 : 1;
     universities = universities.sort((a, b) => {
        const tuitionA = a.majorsAvailable[0]?.tuitionFees || 0; 
        const tuitionB = b.majorsAvailable[0]?.tuitionFees || 0;
        if (tuitionA < tuitionB) return -1 * sortOrder;
        if (tuitionA > tuitionB) return 1 * sortOrder;
        return 0;
      });
    
    }
    if (sortBy === 'name') {
        const sortOrder = order === 'desc' ? -1 : 1;
        universities = universities.sort((a, b) => {
            if (a.name < b.name) return -1 * sortOrder;
            if (a.name > b.name) return 1 * sortOrder;
            return 0;
          });
      }
    const results=await universities; 
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search universities by name
router.get('/search', checkAuthenticated, async (req, res) => {
  try {
    const { name, sortBy, order } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Name is required for searching." });
    }

    const query = { name: { $regex: name, $options: 'i' } };

    let universities = University.find(query);

    if (sortBy === 'name') {
        const sortOrder = order === 'desc' ? -1 : 1;
        universities = universities.sort({ 'name': sortOrder });
      }

    const results = await universities;
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
