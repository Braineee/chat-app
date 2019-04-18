// MODELS
const models = require('../models');

// CONTROLLERS
const UserController = require('../controllers/UserController');

/**
 * isvalidated function checks if the user has validated his/her account
 * 1. Requires req.user.id
 */
const isValidated = async (req, res, next) => {
    // Check user validation status
    let status = await UserController.isValidated(models.User, req.user.id);
    
    // Return forbidden if the user account has not been validated
    if(!status) return res.status(403).json({success: false, message: "This account has not been verified, please verify your account", responseType: "account_not_validated"});

    next();
}

//Export the is validated module
module.exports = isValidated;