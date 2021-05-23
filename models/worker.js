'use strict';
const {
  Model
} = require('sequelize');
const { worker } = require('../controller');
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Worker.belongsTo(models.User,{
        foreignKey: "user_id"
      }
        )
    }
  };
  Worker.init({
    worker_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    user_id: DataTypes.INTEGER,
    service_provider_location_id: DataTypes.INTEGER,
    is_available: DataTypes.BOOLEAN,
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'Worker',
    tableName: 'worker',
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
  });
  return Worker;
};