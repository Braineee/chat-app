// Require express package
const express = require('express');

// Set router.
const router = express.Router();

// CONTROLLERS
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

/** 
 * ROUTES
*/ 

// MAIN ROUTES
router.get('/', (req, res) => res.send('Welcome to enigma chat API'));

// AUTH ROUTES
router.post('/auth/register/', AuthController.Register);
router.post('/auth/login/', AuthController.Login);

// USER ROUTES
router.get('/users/get_all_users', UserController.GetAllUsers);
router.get('/users/findone/:userdata', UserController.findOne);

// Export router
module.exports = router;