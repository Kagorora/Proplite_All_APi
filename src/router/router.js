import express from 'express';
import userController from '../controllers/userController';
import auth from '../authentification/auth';
import schema from '../helpers/validation';
import propertyController from '../controllers/propertyController';

const route = express.Router();
route.get('/', userController.welcome);

// ----------------------------- USERS   -----------
route.post('/api/v1/auth/signup', schema.userSignup, userController.signup);
route.post('/api/v1/auth/signin', schema.userSignin, userController.signin);
// ----------------------------- PROPERTIES --------
route.post('/api/v1/auth/property', auth, schema.postProduct, propertyController.createProduct);
route.post('/api/v1/auth/property/:id', auth, schema.postProduct, propertyController.findById);


export default route;


