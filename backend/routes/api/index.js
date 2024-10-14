// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots");
const reviewsRouter = require("./reviews.js");
const revImgRouter = require("./review-images.js");
const spotImgRouter = require('./spot-images.js');
const bookingsRouter = require("./bookings.js");
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use("/bookings", bookingsRouter);

router.use("/spots", spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/review-images', revImgRouter);

router.use('/spot-images', spotImgRouter);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.post("/test", (req, res) => {
  console.log("hello world")
  res.json({ requestBody: req.body });
});

// router.use("/", (err, req, res, next) => {

// });

module.exports = router;
