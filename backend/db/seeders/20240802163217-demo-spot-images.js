"use strict";
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const imgs = [
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-48850241/original/19d30824-e3a0-48ef-b239-7085c95f9ec8.jpeg?im_w=720",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w2208/mlb/ihqtqmjae9cbhwf2fq7c.jpg",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/e4dc4b75-0936-49ec-a773-046d3ade0474.jpg?im_w=720",
    preview: true,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-13646016/original/571a826f-3550-4ecb-b451-adf97ec9d78d.jpeg?im_w=720",
    preview: true,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/airflow/Hosting-558022356946357962/original/77a86fab-9361-4ece-b126-2789f74385b1.jpg?im_w=720",
    preview: true,
  },
];

/** @type {import('sequelize-cli').Migration} */
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
    await SpotImage.bulkCreate(imgs, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options, imgs, {});
  },
};
