'use strict'

// Require sequelize 
const Sequelize = require('sequelize');

const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    alias: DataTypes.STRING
}, {});
Group.associate = function(models) {
    // associations can be defined here
};

module.exports = Group;
