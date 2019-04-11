//require the user object
const User = require('../models/User');

// Initilaize the UserController object
const UserController = {};

// Get all users
UserController.GetAllUsers = (req, res) => {
    let offset = (req.query.offset) ? req.query.offset : 0;
    let limit = (req.query.limit) ? req.query.limit : 20;
    let orderBy = (req.query.orderBy) ? req.query.orderBy : 'id';
    let order = (req.query.order) ? req.query.order : 'ASC';
    let ordering = [
        [orderBy, order],
    ];

    let users = User.findAllCount({
        offset: parseInt(offset), 
        limit: parseInt(limit),
        where: whereConditions,
        order: ordering,
        attributes: ['id', 'firstName', 'lastName', 'profilePhoto', 'username', 'isActive', 'location', 'PhoneNo',],
    }).then((users) => {
        return res.json({success: true, data: users});
    }).catch(err => {
        return false;
    });

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

// Get one user
UserController.findOne = (req, res) => {
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
        include: [{model: models.Group}]
    }).then((user) => {
        if (user == null) return res.json({success: false, message: 'Found no account with this details'});
        return res.json({success: true, message: 'Processed', data: user})
    })
}


// Export the UserController
module.exports = UserController;

