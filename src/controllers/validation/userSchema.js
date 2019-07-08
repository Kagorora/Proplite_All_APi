import Joi from 'joi';
import JoiPasswordComplexity from 'joi-password-complexity';

// const complexPassword = {
//     min: 8,
//     max: 20,
//     lowerCase: 1,
//     upperCase: 1,
//     numeric: 1,
//     requirementCount: 2,
//   };

 
const userSchema = Joi.object().keys({
    id: Joi.number().required(),
    email: Joi.string().email().required(),
    first_Name: Joi.string().alphanum().min(2).required(),
    last_Name: Joi.string().alphanum().min(2).required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().alphanum().min(2).required(),
    address: Joi.string().alphanum().min(2).required(),
    is_admin: Joi.boolean().required()
});

export default userSchema;
