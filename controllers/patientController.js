const Patient = require('../models/patientModel');
const factory = require('./handlerFactory');

exports.setClinicId = (req, res, next) => {
    if (!req.body.clinic) req.body.clinic = req.user.id;
    next();
  };
  
// ROUTE HANDLERS
exports.getAllPatients = factory.getAll(Patient);
exports.getPatient = factory.getOne(Patient);
exports.createPatient = factory.createOne(Patient);
exports.updatePatient = factory.updateOne(Patient);
exports.deletePatient = factory.deleteOne(Patient);
