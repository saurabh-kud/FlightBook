const asyncHandler = require("express-async-handler");
const flight = require("../../Models/FlightModel/flightModel");

const addFlight = asyncHandler(async (req, res) => {
  const {
    flightNumber,
    flightName,
    origin,
    destination,
    departureTime,
    arrivalTime,
    price,
  } = req.body;

  if (
    !flightNumber ||
    !flightName ||
    !origin ||
    !destination ||
    !departureTime ||
    !arrivalTime ||
    !price
  ) {
    res.status(400);
    throw new Error("all field is mandotory");
  }
  if (await flight.findOne({ flightNumber })) {
    res.status(403);
    throw new Error("Flight already added");
  }
  try {
    const flightData = await flight.create({
      flightNumber,
      flightName,
      origin,
      destination,
      departureTime,
      arrivalTime,
      price,
    });

    if (flightData) {
      const departureTime = new Date(flightData.departureTime);
      const arrivalTime = new Date(flightData.arrivalTime);

      const formattedDepartureTime = departureTime.toLocaleString();
      const formattedArrivalTime = arrivalTime.toLocaleString();

      console.log("Departure Time:", formattedDepartureTime);
      console.log("Arrival Time:", formattedArrivalTime);
      res.status(201).json({
        message: "flight added sucessfully",

        data: flightData,
      });
    }
  } catch (error) {
    throw new Error("something went wrong");
  }
});

// removing flight from database

const removeFlight = asyncHandler(async (req, res) => {
  const { flightNumber } = req.params;
  if (!flightNumber) {
    res.status(400);
    throw new Error("id not found");
  }
  try {
    const deletedFlight = await flight.findOneAndDelete({ flightNumber });
    if (deletedFlight) {
      res.status(200).json({
        status: true,
        message: "deleted sucessfully",
        data: deletedFlight,
      });
    } else {
      res.status(400);
      throw new Error("Flight not available");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Flight not available");
  }
});

// searching flight

const searchFlight = asyncHandler(async (req, res) => {
  const { date, time } = req.query;

  // Parse the date components
  const [year, month, day] = date.split("-");

  // Parse the time components
  const [hour, minute, second] = time.split(":");

  // Create a new Date object using the parsed components
  const combinedDateTime = new Date(year, month - 1, day, hour, minute, second);
  const combinedDateTimeNew = new Date(year, month - 1, (Number(day)+1), hour, minute, second);

  console.log(combinedDateTime.toISOString());
  console.log(combinedDateTimeNew);

  try {
    const flightsToSearch = await flight.find({
      departureTime: {
        $gte: combinedDateTime.toISOString(),
        $lte:combinedDateTimeNew
      },
        arrivalTime: {
          $gt: combinedDateTime.toISOString(),
        },
      availableSeats: {
        $gt: 0,
      },
    });

    if (!flightsToSearch) {
      throw new Error("flight not available");
    }

    res.json({
      status: "true",
      message: "fetched sucessfully",
      data: flightsToSearch,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addFlight,
  removeFlight,
  searchFlight,
};
