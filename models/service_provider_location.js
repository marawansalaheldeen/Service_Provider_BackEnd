'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ServiceProviderLocation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ServiceProviderLocation.belongsTo(models.ServiceProvider,{
                foreignKey: "service_provider_id"
            })
            
            // 1 has many workers
            ServiceProviderLocation.hasMany(models.Worker, {
                foreignKey: "service_provider_location_id"
            });

            ServiceProviderLocation.hasMany(models.serviceProviderService, {
                foreignKey: "service_provider_location_id"
            });

          
        }
    };
    ServiceProviderLocation.init({
        service_provider_location_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        service_provider_id: DataTypes.INTEGER,
        city: DataTypes.STRING,
        area: DataTypes.STRING,
        street: DataTypes.STRING,
        status: {
            type: DataTypes.STRING,
            defaultValue: 'In_Active'
        },
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
        modelName: 'ServiceProviderLocation',
        tableName: 'service_provider_location',
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });
    return ServiceProviderLocation;
};