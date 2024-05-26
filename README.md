# Flight-Search-API

An API searches flights that supports multiple passengers and calculates CO2 emissions for each passenger based on flight distance. A small web application using React for the simple search form and results.

## Documentation

- **System Design Document** for Node.js / GraphQL API:   [flight-search-api](flight-search-api/README.md)
- **System Design Document** for React App:   [react-search-ui](react-search-ui/README.md)

## Functionality

- Filters flights based on the departure city, destination city, and date.
- Returns flight details including flight number, airline, departure time, arrival time, price, and CO2 emissions.
- Calculates CO2 emissions based on flight distance.

## System Design Considerations

- Designed the system to handle concurrent requests efficiently.
- Implemented caching to improve performance and reduce load on the database.
- Implemented basic logging and error handling.

## Web App

- Implemented sorting of flights by the departure city, destination city, and date.
- Design the page displaying the flights list as table.

