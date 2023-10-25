"use strict";

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require("../models");
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
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://i.pinimg.com/originals/2c/57/27/2c5727c9b2409b567f7f10207ae8d0b8.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://photos.zillowstatic.com/fp/46023a7defc6d99ea333ad9205459db5-p_e.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://cdn.homedit.com/wp-content/uploads/2017/05/America-Most-Expensive-Bel-Air-Los-Angeles-Residence.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://mygate.com/wp-content/uploads/2023/07/110.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_24/1448814/how-size-doesnt-make-you-happier-today-main-190614.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUNbnw2aIPuHKOSEFIIRXWb8Kw6oAb4EyTtp1JRfE47TNsLA7qyYcc_YJBOhOqYxUti4&usqp=CAU",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/08/kiawah_island-realtor.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://miro.medium.com/v2/resize:fit:633/1*SLwl_DPs2kFvV_VvMtODUQ.jpeg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://pm1.aminoapps.com/7008/476bf1fbcc4a4e1b24049ffc39b816fe08c505aar1-1080-786v2_00.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://images-s.kinorium.com/movie/shot/1700728/h280_46944554.jpg?21611946679",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://as2.ftcdn.net/v2/jpg/01/89/68/07/1000_F_189680782_0uPvJpPpRJLXRWJmgBZQk3DF6yruzGJp.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://randomc.net/image/Tensei%20shitara%20Slime%20Datta%20Ken/Tensei%20shitara%20Slime%20Datta%20Ken%20-%2013%20-%2034.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://pm1.narvii.com/8294/b6d9316dd92e54fc59943b9c0f21ee669781406cr4-750-375_00.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://img.wattpad.com/story_parts/1138224965/images/16ab2b269f43d002946472787808.jpg",
          preview: true,
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
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        spotId: {
          [Op.in]: [1],
        },
      },
      {}
    );
  },
};
