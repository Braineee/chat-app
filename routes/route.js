// Require express package
const express = require('express');

// Set router.
const router = express.Router();

// CONTROLLERS
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

// MIDDLEWARES
const verifyData = require('../middleware/verifyData');
const verifyToken = require('../middleware/verifyToken');
const isValidated = require('../middleware/isValidated');


/** 
 * ROUTES
*/ 

// MAIN ROUTES
router.get('/', (req, res) => res.send('Welcome to enigma chat API'));



// AUTH ROUTES
// User registration
router.post('/auth/register/', [verifyData], AuthController.Register);

// User login
router.post('/auth/login/', AuthController.Login);

// Validate sms token
router.post('/auth/validate_sms_token/', [verifyData], AuthController.ValidateSMSToken);



// USER ROUTES
// Get list of all users
router.get('/users/get_all_users', [verifyToken], [isValidated], UserController.GetAllUsers);

// Get details of a user
/*router.get('/users/find_one/:userdata', [isValidated], UserController.GetUser);

// Get user profile
router.get('/users/get_user_profile', [isValidated], UserController.GetUserProfile);*/

// CHAT ROUTES

// Export router
module.exports = router;