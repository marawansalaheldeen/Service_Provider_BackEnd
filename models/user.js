'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    user_type_id: DataTypes.INTEGER,
    user_first_name: DataTypes.STRING,
    user_last_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    user_password: DataTypes.STRING,
    longitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return user;
};