import React, { useState, useEffect } from "react";
import "../css/mybooking.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBookings = async () => {
      console.log("fetching booked flight");
      try {
        const config = {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        };

        const response = await axios.get(
          `/api/booking/${user?.id}/book`,
          config
        );

        if (response) {
          setBookings(response.data.data);
        } else {
          toast.error("something went wrong");
        }
      } catch (error) {
        toast.error("something went wrong");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h2>Flight Name: {booking.flightName}</h2>
              <h3>Flight: {booking.flightNumber}</h3>

              <p>Departure Time: {booking.departureTime}</p>
              <p>Arrival Time: {booking.arrivalTime}</p>
              <p>Price: {booking.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
