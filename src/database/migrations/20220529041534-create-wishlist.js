



/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wishlist", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id"
        },
        onUpDate: "RESTRICT",
        onDelete: "SET NULL",
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "product",
          key: "id"
        },
        onUpDate: "CASCADE",
        onDelete: "RESTRICT",
        allowNull: false
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

  async down(queryInterface) {
    await queryInterface.dropTable("wishlist");
  },
};
