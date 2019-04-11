'use strict'

// Require sequelize 
module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        name: DataTypes.STRING,
        alias: DataTypes.STRING
    }, {});
    Group.associate = function(models) {
        // associations can be defined here
    };
    return Group;
}

