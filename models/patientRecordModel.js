const mongoose = require('mongoose');

const patientRecordSchema = new mongoose.Schema(
  {
    nurse: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A user must belong to a nurse'],
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A user must belong to a doctor'],
    },
    referral: {
      type: mongoose.Schema.ObjectId,
      ref: 'Referral',
      required: [true, 'Referral ID must belong to a Referral'],
    },
    report: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
//COMBINATION OF OFFER AND USER ARE UNIQUE
patientRecordSchema.index(
  { nurse: 1, doctor: 1, referral: 1 },
  { unique: true },
);

// POPULATE
patientRecordSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'nurse doctor',
    select: 'name phone department',
  });
  next();
});
patientRecordSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'referral',
  });
  next();
});
const PatientRecord = mongoose.model('PatientRecord', patientRecordSchema);

module.exports = PatientRecord;
