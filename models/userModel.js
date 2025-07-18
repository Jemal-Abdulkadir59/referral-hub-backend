const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  department: {
    type: String,
  },
  address: {
    type: String,
    required: [true, 'Please provide your address'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    unique: true,
    validate: [validator.isMobilePhone, 'Please provide a valid phone number'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'nurse', 'doctor', 'data_clerk'],
    default: 'user',
  },
  status: {
    type: String,
    default: 'pending',
    enum: {
      values: ['pending', 'active', 'canceled'],
      message: 'Status is either: pending, active, canceled',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only work CREATE and SAVE!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //Hash the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

//SET PASSWORD CHANGED AT
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// DO NOT SHOW INACTIVE
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// INSTANCE METHOD :  method available all document of certain collection
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedpasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    // console.log(changedTimestamp, JWTTimestamp);

    return JWTTimestamp < changedTimestamp;
  }

  //False means Not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const restToken = crypto.randomBytes(32).toString('hex');

  // encrypt reset token
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(restToken)
    .digest('hex');

  // console.log({ restToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return restToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
