import Sequelize from 'sequelize';

import User from '../app/models/User';
import EquipmentType from '../app/models/EquipmentType';
import OperationalArea from '../app/models/OperationalArea';
import Equipment from '../app/models/Equipment';

import databaseConfig from '../configs/database';

const models = [User, EquipmentType, OperationalArea, Equipment];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
