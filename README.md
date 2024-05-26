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

## Future / In Progress 

### Implement Posting Methods:

- Extend the API to support creating, updating, and deleting flight records.
- Define GraphQL mutations for these operations and implement corresponding resolvers.
- Ensure data validation and error handling for create/update operations.

### Dockerize and Host the Application:

- Dockerize the application to containerize it along with its dependencies.
- Write Dockerfiles to define the environment and dependencies for the API.
- Use Docker Compose for multi-container deployment and orchestration.
- Choose a hosting provider (e.g., AWS, Google Cloud, or Azure) or a container service (e.g., Docker Hub, AWS ECS) to deploy the containerized application.

### Enhance React Functionality:


- Implement user authentication and authorization.
- Add features like user profiles, booking management, or flight comparison.
- Improve UI/UX with responsive design, animations, or interactive elements.
- Integrate additional APIs or services (e.g., payment gateways, mapping services) to enhance user experience.
- Write unit and integration tests for React components to ensure reliability.

Each of these tasks can further enhance the functionality, scalability, and usability of the flight search API.