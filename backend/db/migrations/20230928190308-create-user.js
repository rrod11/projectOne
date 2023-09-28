"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING(256),
          allowNull: false,
          unique: true,
        },
        hashedPassword: {
          type: Sequelize.STRING.BINARY,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          defaultValue: "N/A",
        },
        lastName: {
          type: Sequelize.STRING,
          defaultValue: "N/A",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
    await queryInterface.addIndex(
      "Users",
      ["username", "email"],
      {
        unique: true,
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    await queryInterface.removeIndex(options, ["username", "email"]);
    await queryInterface.dropTable(options);
  },
};
