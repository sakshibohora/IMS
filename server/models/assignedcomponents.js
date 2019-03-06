'use strict';
module.exports = (sequelize, DataTypes) => {
  const AssignedComponents = sequelize.define('AssignedComponents', {
    userId: DataTypes.INTEGER,
    componentId: DataTypes.INTEGER,
    assignedBy: DataTypes.INTEGER,
  }, {});
  AssignedComponents.associate = function (models) {
    // associations can be defined here
  };
  return AssignedComponents;
};