'use strict';


module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.INTEGER,
                PrimaryKey: true,
                autoIncrement: true,
            },
            
            email: {
                type: Sequelize.STRING,
                AllowNull: false,
            },

            user_name: {
                type: Sequelize.STRING,
                allowNull: false,
              },

            password: {
                type: Sequelize.STRING,
                allowNull: false,
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


        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
      },
}