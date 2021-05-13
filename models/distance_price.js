'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class distance_price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  distance_price.init({
    metric_unit: DataTypes.STRING,
    metric_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'distance_price',
    tableName: 'distance_price'
  });
  return distance_price;
};