import joi from 'joi';

const singinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default singinSchema;