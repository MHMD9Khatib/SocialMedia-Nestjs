'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },

      title: {
        type: Sequelize.STRING,
        // TODO: make nullable
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
        // TODO: make nullable
        allowNull: false,
      },
      // TODO: created_by, updated_by, deleted_by, it takes id of user
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  },
};
