const express = require("express");
const {
  addFlight,
  removeFlight,
  searchFlight,
  getAllFlight,
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
router.get("/all", getAllFlight);
router.get("/admin/booking", authAdmin, getByAdminBookedFlight);
router.get("/admin/bookingall", authAdmin, getAllFlight);

module.exports = router;
