import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddContact from "./Components/AddContact";
import EditContact from "./Components/EditContact";
import { useSelector } from "react-redux";
import DashboardAdmin from "./Pages/DashboardAdmin";
import AddFlight from "./Components/AddFlight";
import MyBookings from "./Components/MyBooking";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={!user?.isAdmin ? <Dashboard /> : <DashboardAdmin />}
          />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/booking" element={<MyBookings />} />
          <Route
            path="/addflight"
            element={user?.isAdmin ? <AddFlight /> : null}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
