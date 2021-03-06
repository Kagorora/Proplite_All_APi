import express from 'express';
import userController from '../controllers/userController';
import propertiesController from '../controllers/propertiesController'

const route = express.Router();


// ============================================= USERS ================================
// get all users
route.get('/', userController.users);

// Sign Up
route.post('/api/v1/auth/signup', userController.signup);

// Login
route.post('/api/v1/auth/signin', userController.signin);

// ============================================= PROPERTIES ================================


// add a property
route.post('/api/v1/property/', propertiesController.addProperty);

// Update
route.put('/api/v1/property/:id', propertiesController.updateProperty);

// mark product as sold
route.put('/api/v1/property/:id/sold', propertiesController.updatePropertystatus);

// delete a product
route.delete('/api/v1/property/:id', propertiesController.deleteProperty);

// get all proertyAdverts
route.get('/api/v1/property/', propertiesController.Allproperties);

//get one advert
route.get('/api/v1/property/:id', propertiesController.oneProperty);

// get all properties offering the same propertyType
route.get('/properties/find/', propertiesController.findByDetail);






export default route;