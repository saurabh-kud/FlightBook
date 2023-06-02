const {
  bookFlight,
  getBookedFlight,
  getByAdminBookedFlight,
  getAllBooked,
} = require("../../Controllers/BookingController/bookingController");
const {
  auth,
  authAdmin,
} = require("../../Middlewares/AuthMiddleware/authMiddleware");

const router = require("express").Router();

router.post("/:id/book", auth, bookFlight);

router.get("/:id/book", auth, getBookedFlight);
router.post("/admin/book", authAdmin, getByAdminBookedFlight);
router.get("/admin/bookingall", authAdmin, getAllBooked);

module.exports = router;
