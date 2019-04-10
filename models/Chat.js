'use strict'

// Require sequelize 
const Sequelize = require('sequelize');

const Chat = sequelize.define('Chat', {
    senderId: {
        type: Sequelize.INTEGER
    },
    receiverId: {
        type: Sequelize.INTEGER
    },
}, {});

module.exports = Chat;
