// Require the sequelize logical Operators 
const Op = require('sequelize').Op;

//require the user object
const models = require('../models');

// Initilaize the UserController object
const UserController = {};

// Require ErrorHandler
const errorHandler = require('../util/errorHandler');


/**
 * UserController.GetAllUser:
 * 1. Returns all user from the database
 */
UserController.GetAllUsers = (req, res) => {
    let offset = (req.query.offset) ? req.query.offset : 0;
    let limit = (req.query.limit) ? req.query.limit : 20;
    let orderBy = (req.query.orderBy) ? req.query.orderBy : 'id';
    let order = (req.query.order) ? req.query.order : 'ASC';
    let ordering = [
        [orderBy, order],
    ];

    let users = Models.User.findAndCountAll({
        offset: parseInt(offset), 
        limit: parseInt(limit),
        order: ordering,
        attributes: ['id', 'firstName', 'lastName', 'profilePhoto', 'username', 'isActive', 'location', 'PhoneNo',],
    }).then((users) => {
        return res.json({success: true, data: users});
    })
    .catch(err => errorHandler(res, err));

    return users;
}

/**
 * UserController.GetUserById:
 * 1. Return data of a user from db based on the userid
 * 2. Requires user id [int]
 */
UserController.GetUserById = (req, res) => {
    // Check if user data is available
    if (!req.params.userdata) return res.json({success: false, message: "Please provide a user ID", responseType: 'no_userid_provided'});

    // Get the user from the database
    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'profilePhoto', 'username', 'isActive', 'location', 'PhoneNo'],
        where: {id: req.params.userdata}
    })
    .then((user) => {
        // Return false if the user was not found
        if (user == null) return res.json({success: false, message: 'Found no user with this details', responseType: 'no_user_found'});
        
        // Return the user data
        return res.json({success: true, message: 'Processed', data: user, responseType: 'success'});
    })
    .catch(err => errorHandler(res, err));
}

/**
 * UserController.findUser:
 * 1. Returns data of a user from the db
 * 2. Requires user data [any]
 */
UserController.findUser = async (req, res) => {
    // Check if user data is available
    if (!req.params.userdata) return res.json({success: false, message: "Please provide a user ID", responseType: 'no_userid_provided'});

    // Get the user adata from the database
    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'profilePhoto', 'username', 'isActive', 'location', 'PhoneNo'],
        where:{
            [Op.or]: 
                [
                    {id: req.params.userdata}, 
                    {username: req.params.userdata}, 
                    {email: req.params.userdata},
                    {PhoneNo: req.params.userdata},
                ]
        }
    }).then((user) => {
        // Return false if the user was not found
        if (user == null) return res.json({success: false, message: 'Found no user with this details', responseType: 'no_user_found'});
        
        // Return the user data
        return res.json({success: true, message: 'Processed', data: user, responseType: 'success'});
    })
    .catch(err => errorHandler(res, err));
}

/**
 * Usercontroller.getUserContacts:
 * 1. Returns the list of users contacts
 * 2. Requires userid
 */
UserController.getUserContact = (req, res) => {
    console.log(req.params.userid);
}

/**
 * UserController.isValidated:
 * 1. Checks if the user has validate his/her account
 * 2. Requires user id [int]
 */
UserController.isValidated = (userId) => {
    // Check if the user id is available
    if (!userId) return false;

    // Get the user validation status from db
    return models.User.findOne({ where: { id: userId }})
    .then(user => {
        // Return false if user not found
        if (user === null) return false;

        // Return true if the user is validated
        if (user.isVerified === 1) return true;

        // Return false if otherwise
        return false;
    })
    .catch(err => errorHandler(err));
}

// Export the UserController
module.exports = UserController;



