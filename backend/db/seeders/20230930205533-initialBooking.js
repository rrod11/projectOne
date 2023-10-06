"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Booking } = require("../models");
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
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 2,
          startDate: "2010-12-31",
          endDate: "2011-1-11",
        },
        {
          spotId: 1,
          userId: 3,
          startDate: "2021-12-31",
          endDate: "2022-1-11",
        },
        {
          spotId: 1,
          userId: 4,
          startDate: "2023-09-31",
          endDate: "2023-10-11",
        },
        {
          spotId: 2,
          userId: 1,
          startDate: "2023-12-31",
          endDate: "2024-1-11",
        },
        {
          spotId: 2,
          userId: 3,
          startDate: "2018-12-31",
          endDate: "2019-1-11",
        },
        {
          spotId: 3,
          userId: 1,
          startDate: "2023-11-31",
          endDate: "2024-2-11",
        },
        {
          spotId: 3,
          userId: 2,
          startDate: "2018-12-22",
          endDate: "2019-1-21",
        },
        {
          spotId: 1,
          userId: 2,
          startDate: "2023-09-22",
          endDate: "2023-11-21",
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
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {});
  },
};
