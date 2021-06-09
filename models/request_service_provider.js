'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RequestServiceProvider extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            
            // 1 has many workers
            RequestServiceProvider.belongsTo(models.Request, {
                foreignKey: "request_id"
            });

            RequestServiceProvider.belongsTo(models.ServiceProviderLocation, {
                foreignKey: "service_provider_location_id"
            });
        }
    };
    RequestServiceProvider.init({
        request_sp_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        request_id: DataTypes.INTEGER,
        service_provider_location_id: DataTypes.INTEGER,
        request_status: {
            type: DataTypes.STRING,
            defaultValue: 'Pending'
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
        modelName: 'RequestServiceProvider',
        tableName: 'request_service_provider',
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });
    return RequestServiceProvider;
};