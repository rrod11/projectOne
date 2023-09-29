"use strict";

/** @type {import('sequelize-cli').Migration} */
const { User } = require("../models");
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await User.bulkCreate(
      [
        {
          email: "demo@user.io",
          firstName: "Bobby",
          lastName: "Valentino",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          firstName: "T",
          lastName: "I",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          firstName: "Chris",
          lastName: "Brown",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "bobbyb@user.io",
          username: "brownieb",
          firstName: "Bobby",
          lastName: "Brown",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "jamesL@user.io",
          username: "lebronDoesIt",
          firstName: "Lebron",
          lastName: "James",
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "Demo-lition",
            "FakeUser1",
            "FakeUser2",
            "lebronDoesIt",
            "brownieb",
          ],
        },
      },
      {}
    );
  },
};
