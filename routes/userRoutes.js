const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const patientRouter = require('./patientRouter');
const referralRouter = require('./referralRoutes');
const patientRecordRoutes = require('./patientRecordRoutes');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(authController.protect);

// NESTED ROUTE
router.use('/:userId/patients', patientRouter);
router.use('/:userId/referrals', referralRouter);
router.use('/:doctorId/patient-records', patientRecordRoutes);

router.patch('/updateMyPassword', authController.updatePassword);

//CURRENT USER LOGGED IN
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe,
);
router.delete('/deleteMe', userController.deleteMe);
router.get('/me', userController.getMe, userController.getUser);

router
  .route('/')
  .get(authController.restrictTo('admin', 'nurse'), userController.getAllUsers)
  .post(authController.restrictTo('admin'), userController.createUser);
router
  .route('/:id')
  .get(authController.restrictTo('admin', 'nurse'), userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
