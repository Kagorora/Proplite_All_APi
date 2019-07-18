import joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';

class dataValidations {
    static userSignup(req, res, next) {
        const complexityOptions = {
            min: 8,
            max: 20,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            requirementCount: 2,
        };

        const userSchema = joi.object().keys({
            first_name: joi.string().min(3).required(),
            last_name: joi.string().min(3).required(),
            address: joi.string().min(3).required(),
            phoneNumber: joi.string().trim().regex(/^[0-9]{10,13}$/).required(),
            email: joi.string().email().required(),
            password: new PasswordComplexity(complexityOptions),
            is_admin: joi.boolean()
        });
        const {
            first_name, last_name, address, phoneNumber, email, password, is_admin,
        } = req.body;

        if (!email) {
            return res.status(400).json({ status: 400, error: 'email is required' });
        }

        if (!first_name) {
            return res.status(400).json({ status: 400, error: 'first_name is required' });
        }

        if (!last_name) {
            return res.status(400).json({ status: 400, error: 'last_name is required' });
        }

        if (!phoneNumber) {
            return res.status(400).json({ status: 400, error: 'phoneNumber is required' });
        }

        if (!address) {
            return res.status(400).json({ status: 400, error: 'address is required' });
        }

        if (!is_admin) {
            return res.status(400).json({ status: 400, error: 'is_admin is required' });
        }

        if (!password) {
            return res.status(400).json({ status: 400, error: 'password is required' });
        }

        const newUser = userSchema.validate({
            first_name,
            last_name,
            phoneNumber,
            email,
            password,
            is_admin,
            address
        });

        if (newUser.error) {
            if (newUser.error.details[0].type === 'passwordComplexity.base') {
                return res.status(400).json({
                    status: 400,
                    error: 'password length must be 8 with atleast an upper, lower case letter, and a number',
                });
            }
            if (newUser.error.details[0].path[0] === 'phoneNumber') {
                return res.status(400).json({
                    status: 400,
                    error: 'invalid phone number',
                });
            }
            return res.status(401).json({ status: 401, error: newUser.error.details[0].message.replace('"', ' ').replace('"', '') });
        }
        req.user = newUser.value;
        next();
    }

    static userSignin(req, res, next) {
        const complexityOptions = {
            min: 8,
            max: 20,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            requirementCount: 2,
        };

        const userSchema = joi.object().keys({
            email: joi.string().email().required(),
            password: new PasswordComplexity(complexityOptions)
        });
        const {
            email, password,
        } = req.body;

        if (!email) {
            return res.status(400).json({ status: 400, error: 'email is required' });
        }

        if (!password) {
            return res.status(400).json({ status: 400, error: 'password is required' });
        }

        const newUser = userSchema.validate({
            email,
            password
        });

        if (newUser.error) {
            if (newUser.error.details[0].type === 'passwordComplexity.base') {
                return res.status(400).json({
                    status: 400,
                    error: 'password length must be 8 with atleast an upper, lower case letter, and a number',
                });
            }
            return res.status(401).json({ status: 401, error: newUser.error.details[0].message.replace('"', ' ').replace('"', '') });
        }
        req.user = newUser.value;
        next();

    }

    // ==========================   Add Product 
    static postProduct(req, res, next) {
        const propertySchema = joi.object().keys({
            owner: joi.string().min(3).required(),
            status: joi.string().min(3).required(),
            price: joi.number().required(),
            state: joi.string().min(3).required(),
            city: joi.string().min(3).required(),
            address: joi.string().min(3).required(),
            type: joi.string().min(3).required()
        });
        const {
            owner, status, price, state, city, address, type,
        } = req.body;

        if (!owner) {
            return res.status(400).json({ status: 400, error: 'owner is required' });
        }

        if (!status) {
            return res.status(400).json({ status: 400, error: 'status is required' });
        }

        if (!price) {
            return res.status(400).json({ status: 400, error: 'price is required' });
        }

        if (!state) {
            return res.status(400).json({ status: 400, error: 'state is required' });
        }

        if (!city) {
            return res.status(400).json({ status: 400, error: 'city is required' });
        }

        if (!address) {
            return res.status(400).json({ status: 400, error: 'address is required' });
        }

        if (!type) {
            return res.status(400).json({ status: 400, error: 'type is required' });
        }

        const newProduct = propertySchema.validate({
            owner, status, price, state, city, address, type
        });

        if (newProduct.error) {
            if (newProduct.error.details[0].path[0] === 'price') {
                return res.status(400).json({
                    status: 400,
                    error: 'invalid price',
                });
            }
            return res.status(401).json({ status: 401, error: newProduct.error.details[0].message.replace('"', ' ').replace('"', '') });
        }
        req.property = newProduct.value;
        next();
    }

    // ===============================  SEARCH PRODUCT BY ID =========================================
    static searchId(req, res, next) {
        const propertyId = joi.object().keys({
            id: number(),
        });
        const {
            id
        } = req.paramas;

         const propId = propertyId.validate({
            id
        });

        req.property = propId.value;
        next();
    }


}

export default dataValidations;