import Joi from 'joi';

const userSchema = Joi.object().keys({
  id: Joi.number().required(),
  email: Joi.string().email().required(),
  first_Name: Joi.string().alphanum().min(2).required(),
  last_Name: Joi.string().alphanum().min(2).required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().alphanum().min(2).required(),
  address: Joi.string().alphanum().min(2).required(),
  is_admin: Joi.boolean().required(),
});

export default userSchema;
