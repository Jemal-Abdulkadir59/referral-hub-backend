const factory = require('./handlerFactory');
const Referral = require('../models/referralModel');

exports.setClinicId = (req, res, next) => {
  if (!req.body.clinic) req.body.clinic = req.user.id;
  next();
};
exports.getAllReferrals = factory.getAll(Referral);
exports.createReferral = factory.createOne(Referral);
exports.getReferral = factory.getOne(Referral);
exports.deleteReferral = factory.deleteOne(Referral);
exports.updateReferral = factory.updateOne(Referral);
