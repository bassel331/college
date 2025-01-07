const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for admission scores
const AdmissionScoreSchema = new Schema({
  ig: {
    type: Number,
    required: false
  },
  sat: {
    type: Number,
    required: false
  },
  governmentalEducation: {
    type: Number,
    required: false
  }
});

// Define the schema for a major
const MajorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  departments: {
    type: [String],
    required: true
  },
  tuitionFees: {
    type: Number,
    required: true
  },
  admissionScores: AdmissionScoreSchema
});

// Define the schema for a university
const UniversitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  foundationYear: {
    type: Number,
    required: true
  },
  majorsAvailable: [MajorSchema]
});

// Create models
const University = mongoose.model('University', UniversitySchema);

module.exports = University;
