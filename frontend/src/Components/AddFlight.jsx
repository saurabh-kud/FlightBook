import React, { useEffect, useReducer, useState } from "react";
import "./../css/addflight.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddFlight() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightName, setFlightName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [price, setPrice] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !flightNumber ||
      !flightName ||
      !origin ||
      !destination ||
      !departureTime ||
      !arrivalTime ||
      !price
    ) {
      toast.error("All fields are mandotory");
      return;
    }
    const config = {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    };

    const addedFlight = await axios.post(
      "/api/flight/add",
      {
        flightNumber,
        flightName,
        origin,
        destination,
        departureTime,
        arrivalTime,
        price,
      },
      config
    );

    // Reset the form fields after submission
    setFlightNumber("");
    setFlightName("");
    setOrigin("");
    setDestination("");
    setDepartureTime("");
    setArrivalTime("");
    setPrice("");
    if (addedFlight) {
      toast.success("sucess");
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="add-flight-container">
      <h2>Add Flight</h2>
      <form>
        <div className="form-group">
          <label>Flight Number:</label>
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Flight Name:</label>
          <input
            type="text"
            value={flightName}
            onChange={(e) => setFlightName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Departure Airport:</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Arrival Airport:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Departure Time:</label>
          <input
            type="datetime-local"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Arrival Time:</label>
          <input
            type="datetime-local"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={handleSubmit} type="submit">
            Add Flight
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
            type="submit"
          >
            Home
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFlight;
