import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContact, reset } from "../features/ContactUser/contactSlice";

import ContactCard from "../Components/ContactCard";
import "../css/register.css";
import "../css/dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState("");
  const [flightList, setFlightList] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchAllFlight = async () => {
      console.log("i am called");
      const res = await axios.get("/api/flight/all");

      console.log(res);
      if (res) {
        setFlightList(res.data.data);
      }
    };
    fetchAllFlight();

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, navigate]);

  // if (isLoading) {
  //   return <h1>loading....</h1>;
  // }
  console.log(user);

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fligthData = await axios.get(
      `/api/flight/search?date=2023-06-10&time=04:30:00`
    );
    if (fligthData) {
      setFlightList(fligthData.data.data);
      console.log(fligthData.data.data);
    }
  };

  return (
    <div className="con">
      <section className="main">
        <h1>Welcome {user && user.fname}</h1>
        <button
          className="add"
          onClick={() => {
            navigate("/booking");
          }}
        >
          My Booking
        </button>
      </section>

      <section>
        <form action="">
          <label>select date </label>
          <input
            type="datetime-local"
            // min={minDateTime}
            onChange={handleChange}
            value={formData}
            name="leaveEndTime"
          />

          <button className="add" onClick={handleSubmit}>
            Add Contact
          </button>
        </form>
      </section>

      <section className="show_contact">
        <h1 className="h1">Flight list</h1>

        {flightList.length > 0 ? (
          <div className="contact">
            {flightList.map((con) => {
              return <ContactCard key={con._id} con={con} />;
            })}
          </div>
        ) : (
          <h1>no contact avilable</h1>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
