import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ContactCard from "../Components/ContactCard";
import "../css/register.css";
import "../css/dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState("");
  const [flightList, setFlightList] = useState([]);
  const [FlightNumber, setFlightNumber] = useState("");
  const [flightNumberSearch, setFlightNumberSearch] = useState();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchAllFlight = async () => {
      const config = {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      };
      const res = await axios.get("/api/booking/admin/bookingall", config);

      console.log(res);
      if (res) {
        setFlightList(res.data.data);
      }
    };
    fetchAllFlight();

    return () => {
      
    };
  }, [user, dispatch, navigate]);

  //   if (isLoading) {
  //     return <h1>loading....</h1>;
  //   }

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    };
    const fligthData = await axios.get(
      `http://localhost:3000/api/flight/admin/booking?flightNumber=${flightNumberSearch}&date=${formData}`,
      config
    );

    if (fligthData) {
      setFlightList(fligthData.data.data);
      console.log(fligthData.data.data);
    }
  };

  const handleChangeDelete = (e) => {
    setFlightNumber(e.target.value);
  };

  const handleDeleteFlight = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    };
    try {
      const deletedFlight = await axios.delete(
        `/api/flight/remove/${FlightNumber}`,
        config
      );
      console.log(deletedFlight);

      if (deletedFlight) {
        toast.success("flight deleted sucessfully");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="con">
      <section className="main">
        <h1>Welcome {user && user.fname} as admin </h1>
        <button
          className="add"
          onClick={() => {
            navigate("/addflight");
          }}
        >
          Add Flight
        </button>
      </section>

      <section>
        <form>
          <label> Delete Flight</label>
          <input
            type="text"
            // min={minDateTime}
            onChange={handleChangeDelete}
            value={FlightNumber}
            name="deleteflight"
          />
          <br />
          <br />
          <button className="add" onClick={handleDeleteFlight}>
            Delete
          </button>
        </form>
      </section>

      <section>
        <h1>Search booked Flight</h1>

        <form>
          <label>Flight Number</label>
          <input
            type="text"
            // min={minDateTime}
            onChange={(e) => {
              setFlightNumberSearch(e.target.value);
            }}
            value={flightNumberSearch}
            name="deleteflight"
          />
          <label>select date </label>
          <input
            type="datetime-local"
            // min={minDateTime}
            onChange={handleChange}
            value={formData}
            name="leaveEndTime"
          />
          <br />
          <br />
          <button className="add" onClick={handleSubmit}>
            search
          </button>
        </form>
      </section>

      <section className="show_contact">
        <h1 className="h1">Booked Flight list</h1>

        {flightList.length > 0 ? (
          <div className="contact">
            {flightList.map((con) => {
              return <ContactCard key={con._id} con={con} />;
            })}
          </div>
        ) : (
          <h1>no Flight avilable</h1>
        )}
      </section>
    </div>
  );
};

export default DashboardAdmin;
