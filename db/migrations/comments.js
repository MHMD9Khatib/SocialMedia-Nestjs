'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Comments',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        post_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Posts',
            key: 'id',
          },
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
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        comment_time: {
          type: Sequelize.DATE,
          defaultValue: '1000-01-01 00:00:00',
        },
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

      },
      
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Comments');
  },
};
