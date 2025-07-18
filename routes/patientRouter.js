const express = require('express');
const patientController = require('../controllers/patientController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect, authController.restrictTo('user', 'admin'));
router
  .route('/')
  .get(patientController.getAllPatients)
  .post(patientController.setClinicId, patientController.createPatient);

router
  .route('/:id')
  .get(patientController.getPatient)
  .patch(patientController.updatePatient)
  .delete(patientController.deletePatient);

module.exports = router;
