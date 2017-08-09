import express from 'express';
import validate from 'express-validation';

import controller from '../controllers/appointments';
import validations from './validation/appointments';

const router = express.Router();

router.route('/')
  .get(controller.list)
  .post(validate(validations.create), controller.create);

router.route('/:email/availables')
  .get(controller.availables);

router.param('email', validate(validations.get));

export default router;
