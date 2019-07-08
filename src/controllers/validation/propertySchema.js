import Joi from 'joi';
import JoiPasswordComplexity from 'joi-password-complexity';


 
const propertySchema = Joi.object().keys({
    id: Joi.number(),
});

export default propertySchema;