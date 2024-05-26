# Flights Search API

A Node.js application to search for flights using Express, Apollo Server, Sequelize, Redis, and Winston for logging.

## Table of Contents

- [Features](#features)
- [Database Setup and Example Data](#database-setup-and-example-data)
- [Redis Setup](#redis-setup)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [System Design Document](#system-design-document)
- [Further Considerations](#further-considerations)

## Features

- GraphQL API for searching and listing flights.
- Caching with Redis to improve performance.
- Database interaction using Sequelize ORM.
- Comprehensive logging with Winston.

## Database Setup and Example Data

1. Install PostgreSQL on your machine if you haven't already. You can download it from [here](https://www.postgresql.org/download/).

2. Create a PostgreSQL database with the name specified in your `.env` file (`DB_NAME`). You can do this using the PostgreSQL command-line tool `psql` or any GUI tool like pgAdmin.

3. Once your database is set up, you can use Sequelize migrations to create tables and add example data.

The `flights` table is created with the following structure:

```sql
CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    flight_number VARCHAR(10) NOT NULL,
    airline VARCHAR(100) NOT NULL,
    departure_city VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    distance NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`
```

To insert example flight data into your flights table, you can execute the following SQL command:

```sql
INSERT INTO flights (flight_number, airline, departure_city, destination_city, departure_time, arrival_time, price, distance)
VALUES
    ('ABC123', 'Airline A', 'New York', 'Los Angeles', '2024-05-26 08:00:00', '2024-05-26 11:00:00', 300.00, 2500.00),
    ('DEF456', 'Airline B', 'Los Angeles', 'Chicago', '2024-05-26 12:00:00', '2024-05-26 15:00:00', 250.00, 2000.00),
    ('GHI789', 'Airline C', 'Chicago', 'Miami', '2024-05-26 16:00:00', '2024-05-26 19:00:00', 350.00, 1800.00),
    ('JKL012', 'Airline D', 'Miami', 'New York', '2024-05-26 20:00:00', '2024-05-26 23:00:00', 400.00, 2200.00);
```

## Redis Setup

Redis is an open-source, in-memory data structure store used as a database, cache, and message broker. Setting up Redis involves installing and configuring it on your system.

You can install Redis on Ubuntu or Debian using the apt package manager:

```bash
sudo apt update
sudo apt install redis-server
```

Once installed and configured, you can start the Redis server. On Linux, you can typically start the service using:

```bash
sudo systemctl start redis
```

After starting Redis, you can test if it's running correctly by connecting to it using the Redis CLI:

```bash
redis-cli
```

For more information about Redis, visit the [official Redis website](https://redis.io/).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bsarna89/Flight-Search-API.git
   cd flights-search-api
   ```

2. Go to /flight-search-api directory and install dependencies

   ```bash
   npm install
   ```

3. Create a .env file in the root directory and add your environment variables:

```bash
   NODE_ENV=development
   PORT=4002
   DB_NAME=yourdbname
   DB_USER=yourdbuser
   DB_PASS=yourdbpassword
   DB_HOST=yourdbhost
   DB_PORT=5432
   REDIS_HOST=yourredishost
   REDIS_PORT=6379
```

## Running the Application

### Start the application:

```bash
npm start
```

Or with nodemon for dev purposes:
```bash
npm run dev
```

Use Postman or access the GraphQL playground at:
```bash
http://localhost:4002/graphql
```
## System Design Document

### 1. Overall Architecture:

The flight search API follows a typical three-tier architecture:

1. **Presentation Tier**: This consists of the Apollo Server, which handles incoming GraphQL queries and mutations. It interfaces with clients and translates their requests into operations on the backend data.
  
2. **Logic Tier**: The logic tier includes the resolvers and utilities responsible for processing data and business logic. Resolvers interact with the data access layer (DAL) and other services to fulfill GraphQL operations. Utilities such as the CO2 calculator and caching mechanisms aid in processing and optimizing data.

3. **Data Access Tier**: This tier encompasses the database, Redis cache, and associated modules. The database stores flight data, while Redis caches frequently accessed data to reduce latency.

### 2. Components and Interactions:

- **Apollo Server**: Receives GraphQL requests, routes them to appropriate resolvers, and returns responses to clients.
- **Resolvers**: Process GraphQL queries and mutations by interacting with data models and utilities.
- **Models**: Represent flight data structures and manage interactions with the database (via Sequelize).
- **Utilities**: Provide additional functionality such as caching and CO2 emissions calculation.
- **Database (PostgreSQL)**: Stores persistent flight data, including flight details and metadata.
- **Redis Cache**: Stores cached flight data using key-value pairs.

### 3. Data Storage Solutions and Schemas:

- **PostgreSQL Database**: Stores flight data in a relational format. Schema includes tables for flights, with fields such as flight number, airline, departure city, destination city, departure time, arrival time, price, distance, and timestamps.
- **Redis Cache**: Stores cached flight data using key-value pairs. Keys are generated based on search parameters, and values are JSON representations of flight data.

## Further Considerations

### Code Organization

When developing a project, maintaining a clean and organized codebase is crucial for readability, scalability, and maintainability. While the current structure may suffice for now, as the project grows, it's beneficial to further organize files into more granular directories. This not only enhances clarity but also facilitates easier navigation and future modifications.

### Environment Configuration

It's good practice to validate the environment variables to ensure all necessary configurations are set. A library like joi or envalid can be used.

#### Example:

```javascript
// src/config/validateEnv.js
import { cleanEnv, str, port, num } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port(),
    DB_NAME: str(),
    DB_USER: str(),
    DB_PASS: str(),
    DB_HOST: str(),
    DB_PORT: num(),
    REDIS_HOST: str(),
    REDIS_PORT: num(),
  });
};

export default validateEnv;

// Then call this in the main file
import validateEnv from './config/validateEnv';
validateEnv();
```

### Error Handling Enhancements
The current error handling middleware logs and returns a generic message. Can consider differentiating between different error types (e.g., validation errors, database errors) to provide more specific error messages and HTTP status codes.
```javascript
// src/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  logger.error("Express error handler: %o", err);
  
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: 'Validation Error', details: err.errors });
  }

  res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandler;
```

### Security Enhancements
Possible to use security-related middleware like helmet to set various HTTP headers for security.
```javascript
import helmet from 'helmet';
app.use(helmet());
```

### Rate Limiting
To prevent abuse of the API, it's likely to implement rate limiting using middleware like express-rate-limit.
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
```

### Caching Strategy
May to consider invalidating the cache appropriately when data changes. For example, if new flights are added or existing flights are updated, invalidate the relevant cache.
```javascript
const invalidateCache = async (cacheKey) => {
  await redisClient.del(cacheKey);
};

// Example of invalidating cache after a flight update
Flights.afterUpdate(async (flight, options) => {
  const cacheKey = `searchFlights:${flight.departureCity}:${flight.destinationCity}:${flight.departureTime.toISOString().split('T')[0]}`;
  await invalidateCache(cacheKey);
});
```
### Documentation
To make the API well-documented, tools like Swagger can help to create comprehensive API documentation.