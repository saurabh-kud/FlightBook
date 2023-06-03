# FullStack Application for flightBooking

# Api Documentation of to use backend like auth,booking
[https://documenter.getpostman.com/view/25265039/2s93mBwydV](https://documenter.getpostman.com/view/25265039/2s93mBwydV)



# live working url
[https://lpuleave.me](https://lpuleave.me)

# what i have did

- Made backend for Flight booking service 
* Develop frontend to show how is backend working

# what i have implemented in backend 

## types of user
- normal user
* admin

## user use Cases
- register : made register route to handle register the user
- login :  made login route to handle login for normal user and admin

- serching: made searching route to search for flight based on time and date and also a route to show all flight which have seat available 

- booking : made booking route to handle booking for a user and after booking the flight storing it on mongoDB

- show booking : made show booking route to show user all booked flight (authenticated route)

## admin use cases
- login: made login route to login the admin
- add flight : added addflight route to handle adding flight from which user can book flight (only admin can access)

- remove flight : added removeflight route to handle remove flight which availble on db (only admin can access)

- view booked ticket based on time: view booked ticket which booked by user based on flight number and time and also made a route to view all ticket book by user 