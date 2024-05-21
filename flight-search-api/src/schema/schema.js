import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Flight {
    flightNumber: String
    airline: String
    departureTime: String
    arrivalTime: String
    price: Float
    co2Emissions: Float
  }

  type Query {
    allFlights: [Flight] # Define allFlights field to retrieve all flights
    searchFlights(
      departureCity: String!
      destinationCity: String!
      date: String!
    ): [Flight]
  }
`;
