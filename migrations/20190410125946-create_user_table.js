'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
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
            defaultValue: 3
        },
        location: {
            type: Sequelize.STRING
        },
        profilePhoto: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.INTEGER(1),
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
        },
        createdAt: {
        type: Sequelize.DATE,
        allowNull: false
        },
        updatedAT: {
        type: Sequelize.DATE,
        allowNull: false
        },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
