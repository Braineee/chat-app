const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const moment = require('moment');
const awesomePhoneNo = require('awesome-phonenumber');

// Require all MODELS
const models = require('../models');

// Require all UTILITIES
const utility = require('../util/utility');

// Require all UTILITIES
const errorHandler = require('../util/errorHandler');


// Init AuthController
const AuthController = {};

// Create a new account
AuthController.Register = (req, res) => {
    /**
     * Requires the following
     * 1. firstName
     * 2. lastName
     * 3. email
     * 4. PhoneNo
     * 7. location
     * 6. password
     * 8. username
     */
    // Initializ ethe request data
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
        bcrypt.genSalt(10, (err, salt) =>{
            if (err) return res.json({success: false, message: 'Could not complete registation', responseType: 'password_encrption_failure_1'});
            bcrypt.hash(data['password'], salt, (err, hash) => {
                if (err) return res.json({success: false, message: 'Could not complete registation', responseType: 'password_encrption_failure_2'});
                data['password'] = hash;
                saveUser();
            });
        })

        // Function saves user details to db
        const saveUser = () => {
            // Create the user 
            models.User.create(data)
            .then(async (newUser, err) => {
                if (err) return res.json({success: false, message: 'Could not complete registation', responseType: 'failed adding user to db'});
                // Send verification mail
                // Send phone number verification token via sms
                return  res.json({success: true, message: 'your account was created successfully. Please check your email or SMS for verification steps.', responseType: 'successful'});
            })
            .catch(err => errorHandler(res, err));
        }
    })
    .catch(err => { return err });
}

// Export the auth controller
module.exports = AuthController;