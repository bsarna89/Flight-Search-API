# Flight-Search-API

An API searches flights that supports multiple passengers and calculates CO2 emissions for each passenger based on flight distance.

## Functionality

- Filter flights based on the departure city, destination city, and date.
- Return flight details including flight number, airline, departure time, arrival time, price, and CO2 emissions.
- Calculate CO2 emissions based on flight distance.
- Handle edge cases such as no flights found, invalid dates, etc.

## System Design Considerations

- Design the system to handle concurrent requests efficiently.
- Implement caching to improve performance and reduce load on the database.
- Discuss database choices and justify your selection.
- Implement basic logging and error handling.

## Web App

A small web application using React for the simple search form and results.

- Implement sorting of flights by price, duration, or departure time.
- Allow filtering by airline or price range.

## Navigation

**System Design Document** for Node.js / GraphQL API:   [flight-search-api](flight-search-api/README.md)