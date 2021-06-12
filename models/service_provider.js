'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceProvider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1 to 1 worker
      ServiceProvider.hasOne(models.ServiceProviderLocation,{
        foreignKey: "service_provider_id"
      });

      ServiceProvider.belongsTo(models.User,{
        foreignKey: "user_id"
    })
    }
  };
  ServiceProvider.init({
    service_provider_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    company_name: DataTypes.STRING,
    company_type: DataTypes.STRING,
    contact_role: DataTypes.STRING,
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
    modelName: 'ServiceProvider',
    tableName: 'service_provider',
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
  });
  return ServiceProvider;
};