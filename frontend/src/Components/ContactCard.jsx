import React from "react";

import "../css/contactCard.css";

import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ContactCard = ({ con }) => {
  console.log(con);
  const { user } = useSelector((state) => state.auth);

  const handleBooking = async (e) => {
    // alert("booked succesfully");
    console.log(user.id);
    const config = {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    };
    try {
      const bookedFlight = await axios.post(
        `/api/booking/${user?.id}/book`,
        { flightId: con._id },
        config
      );
      if (bookedFlight) {
        toast.success("booked succesfully");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="card">
      <h3>Flight Name: {con.flightName}</h3>
      <small>Flight Number: {con.flightNumber}</small>
      <h5>Departure Time: {con?.departureTime}</h5>
      <h5>Arrival Time: {con.arrivalTime}</h5>
      <h3>Price: {con.price}</h3>

      {user?.isAdmin ? (
        <div>
          <small>UserId: {con.userId}</small>
        </div>
      ) : (
        <div>
          <small>Origin: {con.origin}</small>
          <br />
          <small>Destination: {con.destination}</small>
          <br />
          <br />
          <div className="flex">
            <button onClick={handleBooking}>Book </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
