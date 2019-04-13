const LocalStrategy =  require('passport-local').Strategy;
const awesomePhoneNo = require('awesome-phonenumber');
const moment = require('moment');
const bcrypt = require('bcryptjs');

// Require all MODELS
const models = require('../models');

// Require the AUTHCONTROLLER
const AuthController = require('../controllers/AuthController');

// Require ErrorHandler
const errorHandler = require('../util/errorHandler');


// Validate the user details using passport
const Passport = (passport) => {
    passport.use(
        new LocalStrategy({passReqToCallback: true, usernameField: 'PhoneNo'}, async (req, PhoneNo, password, done) => {
            // Get the phone number format i.e: +234 000 0000 000;
            PhoneNo = awesomePhoneNo(PhoneNo, 'NG').getNumber();

            // Get the user from db
            models.User.findOne({ where: {PhoneNo}})
            .then((user, info) => {
                if (user === null) return done(null, false, { message: 'Sorry, no account found with the details provided', responseType: 'invalid_user'}, info);
                // Proceed to validate password
                validatePassword(user);
            })
            .catch(err => errorHandler(res, err));// TODO: make res dynamic in errorHandler 

            // Validate the password
            const validatePassword = (user) => {
                // compare the password
                bcrypt.compare(password, user.password, (err, isMatch, info) => {
                    if (typeof err == 'undefined') return done(errorHandler(res, err));
                    if (!isMatch) return done(null, false, { message: 'Your password is incorrect. Please try again', responseType: 'invalid_password'}, info);
                    // proceed to check active status
                    checkUserStatus(user);
                });
            }

            // Check if the user is active
            const checkUserStatus = (user, info) => {
                if (user.isActive !== 1) return done(null, false, { message: 'Your account is inactive', responseType: 'account_inactive'}, info);
                // proceed to update user device id
                updateUserDeviceId(user);
            }
            
            // Update the user device ID
            const updateUserDeviceId = (user) => {
                models.User.update({ deviceID: req.body.deviceId }, { where: {id: user.id}})
                .then(async (updateUser, info) => {
                    if (updateUser === null) return done(null, false, { message: 'Could not update user device ID', responseType: 'unable_to_update_device_id'}, info);
                    // Proceed to update user last login
                    updateUserLoginTime(updateUser);
                })
                .catch(err => errorHandler(err));// TODO: make res dynamic in errorHandler 
            }
            
            // Update time user logged in
            const updateUserLoginTime = (user) => {
                models.User.update({ lastLoggedin: moment() }, { where: {id: user} })
                .then((user, info) => {
                    if (user === null) return done(null, false, { message: 'Could not update time for user last login', responseType: 'unable_to_update_last_login'}, info);
                    // Proceed to token generation
                    models.User.findOne({ where: {PhoneNo}})
                    .then((user) => {
                        if (!user) return done(null, false, { message: 'Could not update time for user last login', responseType: 'unable_to_update_last_login'}, info); 
                        generateUserLoginToken(user);
                    })
                    .catch(err => errorHandler(err));// TODO: make res dynamic in errorHandler 
                })
                .catch(err => errorHandler(err));// TODO: make res dynamic in errorHandler 
            }
            
            // Create a token for the user and return the user data as response
            const generateUserLoginToken = async (user, info) => {
                const token = AuthController.generateJWT(user.PhoneNo, user.id);
                user.token_ = token;

                // Remove the password form the user object
                await delete user.password;

                // User has been verified 
                // Return response
                return done(null, user, info);
            }
        })
    )

    // Serialize the user data
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    

    // Deserialize the user data
    passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user) => {
            // Remove the password form the user object
            delete user.password;
            done(null, user);
        }).catch((err) => {
            done(err, null);
        });
    });
}


// Export Passport module
module.exports =  Passport;