'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CompanyInfo.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    name: DataTypes.STRING,
    sector: DataTypes.STRING,
    description: DataTypes.STRING,
    ceo: DataTypes.STRING,
    tags: DataTypes.JSON,
    score: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'CompanyInfo',
  });
  return CompanyInfo;
};