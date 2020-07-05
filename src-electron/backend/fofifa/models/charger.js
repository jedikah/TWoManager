/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('charger', {
    IdCharger: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IdMission: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'mission',
        key: 'IdMission'
      }
    },
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'enqueteur',
        key: 'IdPersonne'
      }
    }
  }, {
    tableName: 'charger'
  });
};
