const mongoose = require("mongoose");

const flightSchema = mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: true,
    },
    flightName: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      default: 60,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("flight", flightSchema);
