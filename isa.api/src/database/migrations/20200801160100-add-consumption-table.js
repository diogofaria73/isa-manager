module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('consumptions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      plc_tag: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      consumption_value: {
        type: Sequelize.DOUBLE,
        allowNull: true,
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
    return queryInterface.dropTable('consumptions');
  },
};
