const {
  bookFlight,
  getBookedFlight,
  getByAdminBookedFlight,
} = require("../../Controllers/BookingController/bookingController");
const {
  auth,
  authAdmin,
} = require("../../Middlewares/AuthMiddleware/authMiddleware");

const router = require("express").Router();

router.post("/:id/book", auth, bookFlight);

router.get("/:id/book", auth, getBookedFlight);
router.post("/admin/book", authAdmin, getByAdminBookedFlight);
//   router.get("/:id/order/:orderid", auth, getSingleOrder);

module.exports = router;
