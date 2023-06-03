# FullStack Application for flightBooking

## Api Postman Documentation of to use backend like auth,booking,admin route etc...

[https://documenter.getpostman.com/view/25265039/2s93mBwydV](https://documenter.getpostman.com/view/25265039/2s93mBwydV)

# live working url (hosted this on aws cloud )

[https://lpuleave.me](https://lpuleave.me)

# what i have did

- Made backend for Flight booking service

* Develop frontend to show how the backend is working

# what i have implemented in backend

## types of user

- normal user

- demo account you can regiter also to test

#### email: `sk@gmail.com` pass: `test@123`

- admin

- demo account

#### email: `test@gmail.com` pass: `test@123`

## user use Cases

- register : made register route to handle register the user
- login : made login route to handle login for normal user and admin

- serching: made searching route to search for flight based on time and date and also a route to show all flight which have seat available

- booking : made booking route to handle booking for a user and after booking the flight storing it on mongoDB

- show booking : made show booking route to show user all booked flight (authenticated route)

## admin use cases

- login: made login route to login the admin
- add flight : added addflight route to handle adding flight from which user can book flight (only admin can access)

- remove flight : added removeflight route to handle remove flight which availble on db (only admin can access)

- view booked ticket based on time: view booked ticket which booked by user based on flight number and time and also made a route to view all ticket book by user

# what i have implemented in frontend

## user use cases

- register a new user

- login user

- after login show the dashboard from where i am show all flight availble and from which they can book any one

- my booking : added a page to show their all booked flight of that particular user

- searching : search a flight based on time and date
- logout : logout that user from site

## admin use cases

- login admin
- after login show the different dashboard which is required for admin

- on that dashboard show all booked ticket by user

- search : search a booked ticket on db based on flight number and time

- add flight: made a page to add flight

- remove flight: implemented remove function based on flight number

- logout

# tech stack used

## for backend

- nodejs
- express
- mongodb
- mongoose
- jwt

## for fronted

- react
- redux
- react-router
- local storage
- axios

# how to use this project

- first clone this repo in your system

### `git clone https://github.com/saurabh-kud/FlightBook.git`

- after cloning install node module for fronted and backend

### `npm install`

- after installation set your env variable for db connection and jwt secret in .env file in backend

- now run the below command in backend folder

### `cd backend`

### `npm start`

- it will run fronted and backend on port 3000 you can check now

# thank you 🙏

# overview how its working

### login

![login](https://raw.githubusercontent.com/saurabh-kud/FlightBook/main/images/login.jpg)

### user dashboard

![dashboard](https://raw.githubusercontent.com/saurabh-kud/FlightBook/main/images/userDashboard.jpg)

### mybooking

![booking](https://raw.githubusercontent.com/saurabh-kud/FlightBook/main/images/userbooking.jpg)

### admin dashboard

![admin dashboard](https://raw.githubusercontent.com/saurabh-kud/FlightBook/main/images/adminDashboard.jpg)

### add flight

![add flight](https://raw.githubusercontent.com/saurabh-kud/FlightBook/main/images/addFlight.jpg)

### search particular booked flight

![booked flight](https://raw.githubusercontent.com/saurabh-kud/FlightBook/main/images/serchbookedflight.jpg)
