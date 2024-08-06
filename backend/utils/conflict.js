const { Booking, Spot, sequelize } = require("../db/models");
const { Op } = require("sequelize");
async function checkConflict(booking) {
  const { spotId, startDate, endDate } = booking;
  const spot = await Spot.findOne({
    where: { id: +spotId },
    include: {
      model: Booking,
      where: { id: { [Op.ne]: booking.id } },
    },
  });
  //               VVVV === spot
  const bookings = spot.Bookings;
  //                    ^^^^^^^^ === bookings
  const res = {};
  for (let i = 0; i < bookings.length; i++) {
    const [min, max, start, end] = [
      new Date(bookings[i].startDate).getTime(),
      new Date(bookings[i].endDate).getTime(),
      new Date(startDate).getTime(),
      new Date(endDate).getTime(),
    ];
    if (
      start === end ||
      (min >= start && min <= end) ||
      (max >= start && max <= end)
    ) {
      res.startDate = "Start date conflicts with an existing booking";
      res.endDate = "End date conflicts with an existing booking";
    }
    if (start >= min && start <= max) {
      res.startDate = "Start date conflicts with an existing booking";
    }
    if (end >= min && end <= max) {
      res.endDate = "End date conflicts with an existing booking";
    }
  }
  return res.startDate || res.endDate ? res : false;
}
module.exports = checkConflict;
