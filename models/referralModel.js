const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema(
  {
    clinic: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Referral must have a clinic ID '],
    },
    // hospital: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'User',
    //   required: [true, 'Referral must have a General Hospital ID'],
    // },
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
      required: [true, 'Referral must belong to a Patient ID'],
    },
    reason: {
      type: String,
      required: [true, 'Referral must have reason'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: 'pending',
      enum: {
        values: ['pending', 'accepted', 'canceled'],
        message: 'Status is either: pending, accepted, canceled',
      },
    },
    referralDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

referralSchema.pre(/^find/, function (next) {
  // mongoose.set('strictPopulate', false);
  this.populate({
    path: 'clinic',
    select: 'name email phone address',
  });
  next();
});
referralSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'patient',
    select: '-createdAt',
  });
  next();
});
// referralSchema.pre(/^find/, function (next) {
//   // this.find({ duration: { $ne: 0 } });
//   this.find({ expiresDate: { $gt: new Date() } });
//   next();
// });

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
