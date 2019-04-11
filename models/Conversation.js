'use strict'

// Require sequelize 
module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation', {
        chatId: {
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER
        },
        message: {
            type: DataTypes.TEXT
        },
    }, {});

    return Conversation;
}