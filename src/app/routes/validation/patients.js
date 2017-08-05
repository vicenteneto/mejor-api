import joi from 'joi';

export default {
  // POST /api/patients
  create: {
    body: {
      email: joi.string().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
      name: joi.string().required(),
      dateOfBirth: joi.date().iso().required(),
      location: joi.string().required(),
      height: joi.number().positive().precision(2).required(),
      weight: joi.number().positive().precision(2).required()
    }
  }
}
