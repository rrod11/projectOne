"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Spot } = require("../models");
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
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "2331 Some Lane",
          city: "Baby",
          state: "NC",
          country: "USA",
          lat: -22.321233,
          lng: 43.9923121,
          name: "Summer House",
          description: "4 bedroom, 5 bath home",
          price: 443.56,
        },
        {
          ownerId: 2,
          address: "1322 Popeyes Point",
          city: "Dead",
          state: "FL",
          country: "USA",
          lat: 46.353233,
          lng: 176.3294534,
          name: "Beach House",
          description: "2 bedroom, 1.5 bath home",
          price: 202.50,
        },
        {
          ownerId: 3,
          address: "4332 Randy Road",
          city: "New Port",
          state: "GA",
          country: "USA",
          lat: 124.353233,
          lng: 10.3294534,
          name: "Mountain House",
          description: "7 bedroom, 6 bath home",
          price: 802.66,
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
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: ["Beach House", "Mountain House"],
        },
      },
      {}
    );
  },
};
