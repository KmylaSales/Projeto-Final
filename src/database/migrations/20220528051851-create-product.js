/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict

// "use strict";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("product", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
          type: Sequelize.INTEGER,
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

  async down (queryInterface){
    await queryInterface.dropTable("product");
  },
};
