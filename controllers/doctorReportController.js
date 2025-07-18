const factory = require('./handlerFactory');
const DoctorReport = require('../models/doctorReportModel');

exports.setDoctorId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.doctor) req.body.doctor = req.user.id;
  next();
};

exports.getAllDoctorReport = factory.getAll(DoctorReport);
exports.createDoctorReport = factory.createOne(DoctorReport);
exports.getDoctorReport = factory.getOne(DoctorReport);
exports.updateDoctorReport = factory.updateOne(DoctorReport);
exports.deleteDoctorReport = factory.deleteOne(DoctorReport);
