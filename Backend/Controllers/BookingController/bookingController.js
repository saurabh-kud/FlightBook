const flight = require("../../Models/FlightModel/flightModel");

const booking = require("../../Models/BookingModel/bookingModel");
const asyncHandler = require("express-async-handler");

//booking flight for user
const bookFlight = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { flightId } = req.body;
  //checking userId in param and token is equal or not
  if (userId != req.user._id) {
    res.status(401);
    throw new Error("not Authorized");
  }

  try {
    const isflightAvailable = await flight.findById(flightId);
    console.log(isflightAvailable);

    if (!isflightAvailable) {
      res.status(404);
      throw new Error("flight doesn't exist");
    }
    if (isflightAvailable.availableSeats <= 0) {
      return res
        .status(400)
        .json({ message: "No available seats on this flight" });
    }

    const bookingDetails = {
      userId,
      flightId: isflightAvailable._id,
      flightNumber: isflightAvailable.flightNumber,
      flightName: isflightAvailable.flightName,
      departureTime: isflightAvailable.departureTime,
      arrivalTime: isflightAvailable.arrivalTime,

      price: isflightAvailable.price,
    };

    const orderFromDb = await booking.create(bookingDetails);
    if (orderFromDb) {
      isflightAvailable.availableSeats--;
      await isflightAvailable.save();
      res.status(201);
      res.json({
        status: true,
        message: "'Flight booked successfully'",
        data: orderFromDb,
      });
    } else {
      res.status(400);
      throw new Error("something went wrong");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
//get booked flight of that particular user
const getBookedFlight = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  //checking userId in param and token is equal or not
  if (userId != req.user._id) {
    res.status(401);
    throw new Error("not Authorized");
  }

  try {
    const bookedFlight = await booking.find({ userId });
    if (bookedFlight.length <= 0) {
      res.status(404);
      throw new Error("you haven't booked any ticket");
    }

    res.status(200).json({
      status: true,
      message: " fetched succefully",
      data: bookedFlight,
    });
  } catch (error) {
    console.log(error);
    throw new Error("internal server error");
  }
});

//get all booked flight only access by admin

const getAllBooked = asyncHandler(async (req, res) => {
  try {
    const bookedFlight = await booking.find();
    if (bookedFlight.length <= 0) {
      res.status(404);
      throw new Error("no booked flight available");
    }

    res.status(200).json({
      status: true,
      message: " fetched succefully",
      data: bookedFlight,
    });
  } catch (error) {
    console.log(error);
    throw new Error("internal server error");
  }
});

// show all flight which mached the createria only access by admin
const getByAdminBookedFlight = asyncHandler(async (req, res) => {
  const { flightNumber, date } = req.query;
  const datenew = new Date(date);

  try {
    const bookedFlight = await booking.find({
      flightNumber,
      departureTime: {
        $gte: datenew,
      },
    });
    if (bookedFlight.length <= 0) {
      res.status(404);
      throw new Error("no fligth booked");
    }

    res.status(200).json({
      status: true,
      message: "fetched sucessfully",
      data: bookedFlight,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  bookFlight,
  getBookedFlight,
  getAllBooked,
  getByAdminBookedFlight,
};
