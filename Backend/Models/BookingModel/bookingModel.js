const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "flight",
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
    },
    flightName: {
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

    cancellable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("booking", bookingSchema);
