"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Review } = require("../models");
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
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 2,
          review:
            "amazing house and really close to the water but it was dirty when we got there",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 3,
          review: "nice house ig",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 4,
          review: "lady was super rude",
          stars: 3,
        },
        {
          spotId: 2,
          userId: 1,
          review: "beautiful home",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 3,
          review: "quiet neighborhood with a ton of private land",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 1,
          review: "beautiful home very very big",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 2,
          review: "quiet neighborhood with a ton of private land couldnt even see the neighbors house",
          stars: 5,
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
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {});
  },
};
