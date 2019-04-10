// Require express package
const express = require('express');

// Set router.
const router = express.Router();

/** 
 * Routes
*/ 

// Main route
router.get('/', (req, res) => res.send('Welcome to enigma chat API'));

// Export router
module.exports = router;