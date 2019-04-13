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
AuthController.Register = (req, res) => {
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
 * 3. deviceID
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
        email: PhoneNo,
        id: id
    }, process.env.SECRETE, {
        expiresIn: expirationDate // expires in 7 days
    });
}



// Export the auth controller
module.exports = AuthController;