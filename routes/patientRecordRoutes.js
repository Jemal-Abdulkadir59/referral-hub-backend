const express = require('express');
const patientRecordController = require('../controllers/patientRecordController');
const authController = require('../controllers/authController');

// MERGE PARAMS
const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route('/')
  .get(
    authController.restrictTo('admin', 'nurse', 'doctor'),
    patientRecordController.getAllPatientRecords,
  )
  .post(
    authController.restrictTo('nurse'),
    patientRecordController.setNurseId,
    patientRecordController.createPatientRecord,
  );

router
  .route('/:id')
  .get(
    authController.restrictTo('admin', 'nurse', 'doctor'),
    patientRecordController.getPatientRecord,
  )
  .patch(
    authController.restrictTo('nurse'),
    patientRecordController.updatePatientRecord,
  )
  .delete(
    authController.restrictTo('nurse'),
    patientRecordController.deletePatientRecord,
  );

module.exports = router;
