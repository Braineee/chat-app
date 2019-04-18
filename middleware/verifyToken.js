// CONTROLLERS
const AuthController = require('../controllers/AuthController');

/**
 * verifytoken function checks if the user has a JWT token and token is valid
 * 1. Enusres JWT token is supplied
 * 2. Ensures JWT token is valid
 * 3. Create req.user
 */
const verifyToken =  async (req, res, next) => {
    // Check if a token is provided
    if (!req.headers.authorization) return res.status(401).json({success: false, message: "Unauthorized", responseType: "no_token_provided"});

    // Validate provided token
    let status = AuthController.validateJWT(req.headers.authorization);

    // Return unauthorized if this token is invalid
    if (!status) return res.status(401).json({success: false, message: "Unauthorized", responseType: "invalid_token"});
    
    // Set the user data for this request
    let data = { id: status.userId, phone: status.userPhone };
    req.user = data;
    console.log(req.user);
    
    next();
}

// Export verifyToken middleware
module.exports = verifyToken;