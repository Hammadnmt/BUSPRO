# Bus Ticket Booking System

A bus ticket booking system that allows passengers to book tickets by providing source, destination, and travel date. The system displays available trips based on the selected route and date. Users can select a trip, choose seats, and proceed to booking by entering their details and applying promo codes.

## Features

- Search for available bus trips by source, destination, and date.
- Select a trip and choose the number of seats.
- Review trip details, selected seats, and total cost.
- Enter passenger details (name, email, phone number).
- Apply promo codes to avail discounts.
- Calculate total payable amount after applying promo codes.
- Store and manage routes, trips, and bookings in a database.

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (Mongoose ORM)
- **Frontend:** React.js (if applicable)
- **Database:** MongoDB
- **Authentication:** JWT (if authentication is implemented)
- **Payment Gateway:** (To be integrated, if needed)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/bus-ticket-booking.git
   cd bus-ticket-booking
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Run the server:
   ```sh
   npm start
   ```

## API Endpoints

### Routes
- `POST /api/routes` - Create a new route.
- `GET /api/routes` - Get all routes.

### Trips
- `POST /api/trips` - Create a new trip.
- `GET /api/trips?source=&destination=&date=` - Get trips based on filters.

### Bookings
- `POST /api/bookings` - Create a new booking.
- `GET /api/bookings/:id` - Get booking details.

### Promo Codes
- `POST /api/promocodes` - Create a new promo code.
- `GET /api/promocodes/:code` - Validate and fetch promo code details.

## Database Models

## Future Enhancements
- Implement a payment gateway.
- Add user authentication and role-based access.
- Introduce seat selection UI on frontend.
- Improve performance with caching.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

