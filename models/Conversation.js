'use strict'

// Require sequelize 
const Sequelize = require('sequelize');

const Conversation = sequelize.define('Conversation', {
    chatId: {
        type: Sequelize.INTEGER
    },
    userId: {
        type: Sequelize.INTEGER
    },
    message: {
        type: Sequelize.TEXT
    },
}, {});

module.exports = Conversation;