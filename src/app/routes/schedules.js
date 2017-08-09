import express from 'express';

import controller from '../controllers/schedules';

const router = express.Router();

router.route('/')
  .get(controller.list);

export default router;
