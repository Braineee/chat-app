'use strict'

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        PhoneNo: {
            type: DataTypes.STRING
        },
        facebookId: {
            type: DataTypes.STRING
        },
        facebookToken: {
            type: DataTypes.STRING
        },
        twitterId: {
            type: DataTypes.STRING
        },
        twitterToken: {
            type: DataTypes.STRING
        },
        googleId: {
            type: DataTypes.STRING
        },
        googleToken: {
            type: DataTypes.STRING
        },
        token: {
            type: DataTypes.STRING
        },
        groupId: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        },
        location: {
            type: DataTypes.STRING
        },
        profilePhoto: {
            type: DataTypes.STRING
        },
        isActive: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1
        },
        isVerified: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
        lastLoggedin: {
            type: DataTypes.DATE
        },
        deviceID: {
            type: DataTypes.STRING
        }
    }, {
        // Set the getter method for users
        getterMethods: {
            fullname(){
                return [this.firstName, this.lastName].join(' ');
            }
        }
    });

    return User;
}
