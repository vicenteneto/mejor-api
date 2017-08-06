import express from 'express';
import validate from 'express-validation';

import controller from '../controllers/appointments';
import patientsController from '../controllers/patients';
import validations from './validation/appointments';

const router = express.Router();

router.route('/')
  .get(controller.list)
  .post(validate(validations.create), controller.create);

router.route('/:email/availables')
  .get(controller.availables);

router.param('email', validate(validations.get));
router.param('email', patientsController.loadByEmail);

export default router;
