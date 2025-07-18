const mongoose = require('mongoose');
const slugify = require('slugify');

const patientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'A patient must have a fullName'],
      unique: true,
      maxlength: [
        20,
        'A patient fullName must have less or equal then 20 characters',
      ],
      minlength: [
        2,
        'A patient fullName must have more or equal then 2 characters',
      ],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'A patient must have gender'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'A patient must have a date of birth'],
    },
    phone: {
      type: String,
      required: [true, 'A patient must have a phone number'],
      unique: true,
      validate: {
        validator: function (val) {
          return /^\d{10}$/.test(val);
        },
        message: 'Phone number must be 10 digits',
      },
    },
    address: {
      type: String,
      required: [true, 'Please provide your address'],
    },
    clinic: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Referral must have a clinic ID '],
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    slug: String,
    medicalHistory: String,
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

// VIRTUAL POPULATE FOR FLYERS PARENT REFERENCE
// patientSchema.virtual('flyers', {
//   ref: 'Flyer',
//   foreignField: 'retailer',
//   localField: '_id',
// });

// DOCUMENT MIDDLEWARE :runs before .save() and .create() "this" key word point currently process document
patientSchema.pre('save', function (next) {
  this.slug = slugify(this.fullName, { lower: true });
  next();
});

// QUERY MIDDLEWARE : regular expression point all starts with find /^find/
// patientSchema.pre(/^find/, function (next) {
//   this.find({ secretRetailer: { $ne: true } });
//   next();
// });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
