const express = require("express");
const {
  addFlight,
  removeFlight,
  searchFlight,
} = require("../../Controllers/FlightController/flightController");

const {
  getByAdminBookedFlight,
} = require("../../Controllers/BookingController/bookingController");
const {
  auth,
  authAdmin,
} = require("../../Middlewares/AuthMiddleware/authMiddleware");
const router = express.Router();
router.post("/add", authAdmin, addFlight);
router.delete("/remove/:flightNumber", authAdmin, removeFlight);
router.get("/search", searchFlight);
router.get("/admin/booking", authAdmin, getByAdminBookedFlight);

module.exports = router;
