'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FuelCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            FuelCategory.belongsTo(models.Service,{
                foreignKey: 'service_id'
            })

            FuelCategory.hasMany(models.serviceProviderService,{
                foreignKey: "fuel_category_id"
            })
        }
    };
    FuelCategory.init({
        fuel_category_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        service_id: DataTypes.INTEGER,
        fuel_category_name: DataTypes.STRING,
        fuel_category_description: DataTypes.STRING,
        fuel_category_price: DataTypes.DOUBLE,
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
        modelName: 'FuelCategory',
        tableName: 'fuel_category',
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });
    return FuelCategory;
};