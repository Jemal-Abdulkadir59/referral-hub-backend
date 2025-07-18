const PatientRecord = require('../models/patientRecordModel');
const factory = require('./handlerFactory');

exports.setNurseId = (req, res, next) => {
  if (!req.body.nurse) req.body.nurse = req.user.id;
  next();
};

exports.getAllPatientRecords = factory.getAll(PatientRecord);
exports.createPatientRecord = factory.createOne(PatientRecord);
exports.getPatientRecord = factory.getOne(PatientRecord);
exports.updatePatientRecord = factory.updateOne(PatientRecord);
exports.deletePatientRecord = factory.deleteOne(PatientRecord);
