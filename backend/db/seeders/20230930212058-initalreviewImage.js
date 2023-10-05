"use strict";

/** @type {import('sequelize-cli').Migration} */
const { ReviewImage } = require("../models");
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
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: "https://media.istockphoto.com/id/1007757070/photo/messy-living-room-with-damage.jpg?s=612x612&w=0&k=20&c=yNFJRqfZFrHypqcbwUoE5N2BO_DB3SvXBASLIk9zqkw=",
        },
        {
          reviewId: 2,
          url: "https://cullumhomes.com/assets/blog/2022%20Interior%20Design%20Trends%20for%20Luxury%20Homes%20Featured.jpg",
        },
        {
          reviewId: 3,
          url: "https://www.azcentral.com/gcdn/-mm-/662af3148f30bf72ccc3d81d324b42694a97749e/c=0-73-1440-887/local/-/media/Phoenix/None/2014/10/30/635502845274408127-phxdc5-6hp7m512uc3g1q7k32g-original.jpg?width=660&height=374&fit=crop&format=pjpg&auto=webp",
        },
        {
          reviewId: 4,
          url: "https://i.pinimg.com/1200x/40/f6/a4/40f6a426d207ce438d29ab977c828055.jpg",
        },
        {
          reviewId: 5,
          url: "https://www.homebunch.com/wp-content/uploads/2016/09/Family-Room.-Beautiful-Homes-of-Instagram-Sumhouse_Sumwear.jpg",
        },
        {
          reviewId: 6,
          url: "https://www.worldconstructiontoday.com/wp-content/uploads/2022/03/An-Interior-And-Exterior-Design-Guide-For-Luxury-Homes.jpg",
        },
        {
          reviewId: 2,
          url: "https://i.pinimg.com/736x/9b/e1/7f/9be17fe8e353a12dbfd24455c9de0fba.jpg",
        },
        {
          reviewId: 3,
          url: "https://macdonaldhighlands.com/wp-content/uploads/2021/01/luxury-design-tips-LV.jpg",
        },
        {
          reviewId: 4,
          url: "https://germaniaconstruction.com/wp-content/uploads/2021/06/Build-your-dream-house-living-room-kamas.jpg",
        },
        {
          reviewId: 5,
          url: "https://1.bp.blogspot.com/-kuc3iMTmIiA/UBZOBLOR0zI/AAAAAAAACxs/9pHYt-Wpc0s/s1600/Modern+home+interior+Brazil+1.jpg",
        },
        {
          reviewId: 6,
          url: "https://i.ytimg.com/vi/KDMUddVZqwo/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDPZi1_Rx9EyY9j7NW8vN5FSeEv5g",
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
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {});
  },
};
