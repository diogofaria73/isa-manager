import Sequelize, { Model } from 'sequelize';

class Equipment extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: Sequelize.STRING,
        area: Sequelize.STRING,
        working: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default Equipment;
