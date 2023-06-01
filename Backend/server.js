const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const errorHandler = require("./Middlewares/ErrorHandlerMiddleware/errorHandlerMiddleware");

const app = express();
const port = process.env.PORT || 3000;

//allowed all remote to acces backend
app.use(
  cors({
    origin: "*",
  })
);

//for handling json body data from front-end
app.use(express.json());
//for handling json body urlencoded data from front-end
app.use(express.urlencoded({ extended: false }));
connectDB();

app.get("/", (req, res) => {
  res.send({ msg: "you are on right path keep going " });
});

app.use("/api/user", require("./Routes/UserRoutes/userRoute"));

//adding flight route

app.use("/api/flight",require("./Routes/FlightRoute/flightRoute"));

// app.use("/api/booking", require("./Routes/BookingRoute/bookingRoute"));


app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
