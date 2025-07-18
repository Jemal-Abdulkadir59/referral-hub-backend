const mongoose = require('mongoose');

const doctorReportSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'doctor must belong to an user'],
  },
  finalReport: {
    type: String,
    required: [true, 'Report can not be empty'],
    trim: true,
  },
  Diagnosis: {
    type: String,
    trim: true,
  },
  MedicationsAtDischarge: {
    type: String,
    trim: true,
  },
  FollowUpInstructions: {
    type: String,
    trim: true,
  },
  Prognosis: {
    type: String,
    trim: true,
  },
  patientRecord: {
    type: mongoose.Schema.ObjectId,
    ref: 'PatientRecord',
    required: [true, 'PatientRecord must belong to an PatientRecord'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

doctorReportSchema.index({ doctor: 1, patientRecord: 1 }, { unique: true });

doctorReportSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'patientRecord',
  });
  next();
});

doctorReportSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'doctor',
  });
  next();
});
const DoctorReport = mongoose.model('DoctorReport', doctorReportSchema);

module.exports = DoctorReport;
