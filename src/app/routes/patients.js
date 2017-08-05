import express from 'express';
import validate from 'express-validation'

import controller from '../controllers/patients'
import validations from './validation/patients'

const router = express.Router();

router.route('/')
  .get(controller.list)
  .post(validate(validations.create), controller.create);

export default router;
