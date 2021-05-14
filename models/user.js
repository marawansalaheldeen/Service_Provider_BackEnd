'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 1 to 1 customer
      User.hasOne(models.Customer, {
        foreignKey: "customer_id"
      });

      // 1 to 1 service provider 
      User.hasOne(models.ServiceProvider,{
        foreignKey: "user_id"
      });
      // 1 to 1 worker
      User.hasOne(models.Worker,{
        foreignKey: "user_id"
      })

      // User.belongsTo(models.Customer)
    }
  };
  User.init({
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_type_id: DataTypes.INTEGER,
    user_first_name: DataTypes.STRING,
    user_last_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    user_password: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN,
    longitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
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
    modelName: 'User',
    tableName: 'user',
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
  });


  return User;

  
};