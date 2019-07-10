import Joi from 'joi';


const propertySchema = Joi.object().keys({
    id: Joi.number(),
    owner: Joi.string().min(2).max(25).required(),
    status: Joi.string().min(2).required(),
    price: Joi.number().required(),
    state: Joi.string().required(),
    city: Joi.string().min(2).required(),
    address: Joi.string().min(2).required(),
    type: Joi.required()

});

export default propertySchema;