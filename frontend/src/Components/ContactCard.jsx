import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../features/ContactUser/contactSlice";
import "../css/contactCard.css";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
      <h3>{con.flightName}</h3>
      <small>Flight Number: {con.flightNumber}</small>
      <h2>Departure Time: {con.departureTime}</h2>
      <h2>Arrival Time: {con.arrivalTime}</h2>
      <h2>Price: {con.price}</h2>

      {user?.isAdmin ? (
        <div>
          <h2>UserId: {con.userId}</h2>
        </div>
      ) : (
        <div>
          <small>Origin: {con.origin}</small>
          <small>Destination: {con.destination}</small>
          <div className="flex">
            <button onClick={handleBooking}>Book </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
