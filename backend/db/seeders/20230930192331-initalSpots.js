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
          price: 202.5,
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
        {
          ownerId: 3,
          address: "34 Lonesome Lane",
          city: "Charlotte",
          state: "NC",
          country: "USA",
          lat: -42.3213433,
          lng: 83.993741,
          name: "City House",
          description: "5 bedroom, 4.5 bath home",
          price: 875.64,
        },
        {
          ownerId: 1,
          address: "13 Cartoon Point",
          city: "Miami",
          state: "SC",
          country: "USA",
          lat: 100.353233,
          lng: 126.3294534,
          name: "Country House",
          description: "7 bedroom, 5 bath home",
          price: 532.99,
        },
        {
          ownerId: 2,
          address: "44 Brandy Road",
          city: "Seattle",
          state: "CA",
          country: "USA",
          lat: 124.353233,
          lng: 9.3294534,
          name: "City Beach Mansion",
          description: "10 bedroom, 11 bath home",
          price: 1200.98,
        },
        {
          ownerId: 1,
          address: "23 Jordan Drive",
          city: "Chicago",
          state: "IL",
          country: "USA",
          lat: 32.321233,
          lng: 83.9923121,
          name: "Snooty Acres",
          description: "6 bedroom, 3 bath home",
          price: 4403.76,
        },
        {
          ownerId: 2,
          address: "2424 Kobe Lane",
          city: "Los Angeles",
          state: "CA",
          country: "USA",
          lat: 26.353233,
          lng: 146.3294534,
          name: "Beautiful Mansion",
          description: "12 bedroom, 11.5 bath home",
          price: 988.50,
        },
        {
          ownerId: 3,
          address: "123 Rum Road",
          city: "Washington",
          state: "DC",
          country: "USA",
          lat: 154.353233,
          lng: 13.3294534,
          name: "Downtown Home",
          description: "3 bedroom, 2.5 bath home",
          price: 702.66,
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
