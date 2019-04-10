'use strict'

// Require sequelize 
const Sequelize = require('sequelize');

const User = sequelize.define('User', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    PhoneNo: {
        type: Sequelize.STRING
    },
    facebookId: {
        type: Sequelize.STRING
    },
    facebookToken: {
        type: Sequelize.STRING
    },
    twitterId: {
        type: Sequelize.STRING
    },
    twitterToken: {
        type: Sequelize.STRING
    },
    googleId: {
        type: Sequelize.STRING
    },
    googleToken: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    },
    groupId: {
        type: Sequelize.INTEGER,
    defaultValue: 4
    },
    location: {
        type: Sequelize.STRING
    },
    profilePhoto: {
        type: Sequelize.STRING
    },
    isActive: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
}, {
    // Set the getter method for users
    getterMethods: {
        fullname(){
            return [this.firstName, this.lastName].join(' ');
        }
    }
});


module.exports = User;
