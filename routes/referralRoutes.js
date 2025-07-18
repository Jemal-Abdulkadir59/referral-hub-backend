const express = require('express');
const referralController = require('../controllers/referralController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(
    authController.restrictTo('admin', 'user', 'nurse', 'data_clerk'),
    referralController.getAllReferrals,
  )
  .post(
    authController.restrictTo('user'),
    referralController.setClinicId,
    referralController.createReferral,
  );

router
  .route('/:id')
  .get(
    authController.restrictTo('admin', 'user', 'data_clerk', 'nurse'),
    referralController.getReferral,
  )
  .patch(
    authController.restrictTo('admin', 'user', 'data_clerk'),
    referralController.updateReferral,
  )
  .delete(
    authController.restrictTo('admin', 'user'),
    referralController.deleteReferral,
  );

module.exports = router;
