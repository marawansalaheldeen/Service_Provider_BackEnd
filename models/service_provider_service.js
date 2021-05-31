'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service_provider_service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      service_provider_service.belongsTo(models.FuelCategory,{
        foreignKey: "fuel_category_id"
      })

      service_provider_service.belongsTo(models.Service,{
        foreignKey: "service_id"
      })

      service_provider_service.belongsTo(models.ServiceProviderLocation,{
        foreignKey: "service_provider_location_id"
      })
    }
  };
  service_provider_service.init({
    sps_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fuel_category_id: {
      allowNull:true,
      type:DataTypes.INTEGER
    },
    service_id: DataTypes.INTEGER,
    service_provider_location_id:DataTypes.INTEGER,
    is_available:DataTypes.INTEGER,
    created_at:{
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at:{
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }

  }, {
    sequelize,
    modelName: 'serviceProviderService',    
    tableName: 'service_provider_service',
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
  });
  return service_provider_service;
};