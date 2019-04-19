//require the user object
const User = require('../models/User');

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

    let users = User.findAndCountAll({
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

/* Get a users by ID
UserController.GetUserById = (userId = null) => {
    // Check if the user is not null
    if (userId === null) return res.json({success: false, message: "Please provide user ID"});
    let user = User.findById(userId)
    .then((user) => {
        return user;
    }).catch((err) => {
        return false;
    });

    return user;
}*/

/**
 * UserController.findUser:
 * 1. Returns data of a user from the db
 */
UserController.findUser = async (req, res, User) => {
    // Check if user data is available
    if (!req.params.userdata) return res.json({success: false, message: "Please provide a user ID"});
    let userdata = req.params.userdata;
    User.findOne({
        where:{
            $or:{
                id: userdata,
                username: userdata,
                email: userdata
            }
        },
        attributes: ['id', 'firstName', 'lastName', 'profilePhoto', 'username', 'isActive', 'location', 'country', 'PhoneNo'],
    }).then((user) => {
        if (user == null) return res.json({success: false, message: 'Found no account with this details'});
        return res.json({success: true, message: 'Processed', data: user})
    })
    .catch(err => errorHandler(res, err));
}

/**
 * UserController.isValidated:
 * 1. Checks if the user has validate his/her account
 * 2. Requires user id
 */
UserController.isValidated = (User, userId) => {
    // Check if the user id is available
    if (!userId) return false;

    // Get the user validation status from db
    return User.findOne({ where: { id: userId }})
    .then(user => {
        // Return false if user not found
        if (user === null) return false;

        // Return true if the user is validated
        if (user.isVerified === 1) return true;

        // Return false if otherwise
        return false;
    })
    .catch(err => errorHandler(res, err));

    return false;
}

// Export the UserController
module.exports = UserController;



