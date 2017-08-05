import express from 'express';
import validate from 'express-validation'
import validations from './validation/patients'
import controller from '../controllers/patients'

const router = express.Router();

router.route('/')
  .get(controller.list)
  .post(validate(validations.create), controller.create);

export default router;
