const express = require('express');
const authController = require('../controllers/authController');
const doctorReportController = require('../controllers/doctorReportController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(
    authController.restrictTo('admin', 'nurse', 'doctor'),
    doctorReportController.getAllDoctorReport,
  )
  .post(
    authController.restrictTo('doctor'),
    doctorReportController.setDoctorId,
    doctorReportController.createDoctorReport,
  );

router
  .route('/:id')
  .get(
    authController.restrictTo('admin', 'nurse', 'doctor'),
    doctorReportController.getDoctorReport,
  )
  .patch(
    authController.restrictTo('doctor'),
    doctorReportController.updateDoctorReport,
  )
  .delete(
    authController.restrictTo('doctor'),
    doctorReportController.deleteDoctorReport,
  );

module.exports = router;
