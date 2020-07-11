import Sequelize, { Model } from 'sequelize';

class Equipment extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        tag: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.OperationalArea, {
      foreignKey: 'operational_area_id',
      as: 'area',
    });
    this.belongsTo(models.EquipmentType, {
      foreignKey: 'equipment_type_id',
      as: 'type',
    });
  }
}

export default Equipment;
