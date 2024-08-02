"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Spot);
      Booking.belongsTo(models.User);
    }
  }
  Booking.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter: new Date(Date.now()).toISOString().split("T")[0], // only allow date strings after a specific date
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter(date) {
            const end = new Date(date);
            const start = new Date(this.startDate);
            if (end.getTime() < start.getTime()) {
              throw new Error("end date must be after start date");
            }
          }, // only allow date strings before a specific date},
        },
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};