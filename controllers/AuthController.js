const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const awesomePhoneNo = require('awesome-phonenumber');
const passport = require('passport');

// Require all MODELS
const models = require('../models');

// Require all Utilities
const utility = require('../util/utility');

// Require SMS
const SMS = require('../util/sendSMS');

// Require ErrorHandler
const errorHandler = require('../util/errorHandler');

// Init AuthController
const AuthController = {};

// REGISTER
/**
 * To register a new user the following are required:
 * 1. firstName
 * 2. lastName
 * 3. email
 * 4. PhoneNo
 * 5. location
 * 6. password
 * 7. username 
 */
AuthController.Register = async (req, res) => {
    // Initialize the request data
    let data = req.body;

    // Get the phone number format i.e: +234 000 0000 000;
    data['PhoneNo'] = awesomePhoneNo(data.PhoneNo, 'NG').getNumber();

    // Check if the user has been created previously
    let email = data['email'];
    models.User.findOne({ where: {email}})
    .then(async (user) => {
        // User alrady exists
        if (user !== null) return res.json({success: false, message: 'An account with this credintials exists already', responseType: 'account_exists'});

        // User does not exit - create a new user
        // Generate a phone number validation token
        let token = utility.createFourDigitsToken();
        data['token'] = token;

        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
            if (err) errorHandler(res, err,  'Could not complete registation', 'password_encrption_failure_1');
            bcrypt.hash(data['password'], salt, (err, hash) => {
                if (err) errorHandler(res, err,  'Could not complete registation', 'password_encrption_failure_2');
                data['password'] = hash;
                saveUser();
            });
        })

        // Saves user details to db
        const saveUser = async () => {
            // Create the user 
            models.User.create(data)
            .then(async (newUser) => {
                if (newUser === null) return res.json({success: false, message: 'Could not complete registation', responseType: 'failed adding user to db'});
                // Proceed with verification
                sendVerificationSMS(newUser)
            })
            .catch(err => errorHandler(res, err));
        }

        // Send verification SMS
        const sendVerificationSMS = async (newUser) => {
            // Send SMS now
            //let sms = await SMS.SendVerificationToken(newUser.PhoneNo, newUser.token);
        }

        // Return successfull
        return  res.json({success: true, message: 'your account was created successfully. Please check your email or SMS for verification steps.', responseType: 'successful'});
    })
    .catch(err => errorHandler(res, err));
}


// LOGIN
/**
 * Login requires the following:
 * 1. PhoneNo
 * 2. password
 * 3. deviceId
 */ 
AuthController.Login = async (req, res, next) => {
    // Check for the needed data
    if (!req.body.PhoneNo || !req.body.password) return res.json({success: false, message: "Please provide login credentials", responseType: 'incomplete_fields'});

    // Login using Passport
    passport.authenticate('local', async (err, user, info) => {
        if (err) errorHandler(res, err, info.message);
        if (!user) return res.json({success: false, message: info.message, responseType: info.responseType});

        // Remove password from the user object if any
        await delete user.password;

        // Return login response
        return  res.json({success: true, message: 'Authentication successful!', authToken: user.token_, user: user, responseType: 'authentication_successful'}); 
    }
    )(req, res, next)
}


// VERIFY SMS TOKEN
/**
 * Verify sms token:
 * 1. Verifies the authentication token sent to the user via sms
 * 2. Requires user id
 * 3. Requires token
 */
AuthController.ValidateSMSToken = (req, res) => {
    let data = req.body
    let id = data['id'];

    // Get the user 
    User.findOne({ where: { id } })
    .then((user) => {
        if (user === null) return res.json({success: false, message: "Sorry, no account was found with the details provided", responseType: 'invalid_user'});
        // Proceed to verify token
        verifyToke(user);
    })
    .catch(err => errorHandler(res, err));

    // Verify user token
    const verifyToke = (user) => {
        if (user.token !== data['token']) return res.json({success: false, message: "Wrong token provided", responseType: 'invalid_token'});
        // Proceed to update verification status
        updateVerificationStatus(user.id);
    }

    // Update user verification status
    const updateVerificationStatus = (id) => {
        models.User.update({ isVerified: 1 }, { where: {id} })
        .then((user) => {
            if (user === null) return res.json({success: false, message: "Could not update user verification status. Please try again", responseType: 'unable_to_update_verification_status'});
            // User has been verified 
            // Return response
            models.User.findOne({ where: { id }})
            .then((user) => {
                return  res.json({success: true, message: 'Verification successful!', user: user, responseType: 'verification_successful'});
            })
            .catch(err => errorHandler(res, err));
        })
        .catch(err => errorHandler(res, err));
    }
}


// GENERATE JWT
/**
 * Generate JWT Requires the following:
 * 1. PhoneNo
 * 2. [ UserId ] as id
 */
AuthController.generateJWT = (PhoneNo, id) => {
    // Set the expiration date to 7 days
    const expirationDate = 604800
    
    return jwt.sign({
        phone_no: PhoneNo,
        id: id
    }, process.env.SECRETE, {
        expiresIn: expirationDate // expires in 7 days
    });
}


// VALIDATE JWT
/**
 * Validate JWT:
 * 1. Decodes JWT
 * 2. Decodes user data.
 * 3. Requires token
 */
AuthController.validateJWT = (token) => {
    // Get the token and replace the bearer with ''
    let filtered_token = token.replace("Bearer ","");
    
    // Run the verification
    return jwt.verify(filtered_token, process.env.SECRETE, function(err, decoded) {
        // Return false if the token does not match
        if (err) return false;
        
        // Initialize the user data
        const data = {};
        data.userId = decoded.id;
        data.userPhone = decoded.phone_no;
         
        // Return the users data
        return data;
    });

    return false;
}


// Export the auth controller
module.exports = AuthController;