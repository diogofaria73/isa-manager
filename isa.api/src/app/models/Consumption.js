import Sequelize, { Model } from 'sequelize';

class Consumption extends Model {
  static init(sequelize) {
    super.init(
      {
        plcTag: Sequelize.STRING,
        consumptionValue: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Consumption;
