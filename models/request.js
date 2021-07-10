'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Request extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // 1 has many workers
            Request.belongsTo(models.Worker, {
                foreignKey: "worker_id"
            });

            Request.belongsTo(models.ServiceProviderLocation, {
                foreignKey: "service_provider_location_id"
            });

            Request.belongsTo(models.Customer, {
                foreignKey: "customer_id"
            })

            Request.belongsTo(models.Service, {
                foreignKey: "service_id"
            })

            Request.belongsTo(models.FuelCategory, {
                foreignKey: 'fuel_category_id'
            })

        }
    };
    Request.init({
        request_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        customer_id: DataTypes.INTEGER,
        service_provider_location_id: DataTypes.INTEGER,
        service_id: DataTypes.INTEGER,
        fuel_category_id: DataTypes.INTEGER,
        request_status: {
            type: DataTypes.STRING,
            defaultValue: 'Pending'
        },
        worker_id: DataTypes.INTEGER,
        total_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        is_cancelled: DataTypes.BOOLEAN,
        assigined_date: DataTypes.STRING,
        fine: DataTypes.BOOLEAN,
        rating: DataTypes.INTEGER,
        passengers: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
        modelName: 'Request',
        tableName: 'request',
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });
    return Request;
};