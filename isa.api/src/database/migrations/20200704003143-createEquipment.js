module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('equipments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      working: {
        type: Sequelize.BOOLEAN,
        default: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('equipments');
  },
};
