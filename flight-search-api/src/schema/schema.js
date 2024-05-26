import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Flight {
    flightNumber: String
    airline: String
    departureTime: String
    arrivalTime: String
    price: Float
    co2Emissions: Float
    departureCity: String
    destinationCity: String
  }

  type Query {
    allFlights: [Flight]
    searchFlights(
      departureCity: String!
      destinationCity: String!
      date: String!
    ): [Flight]
  }
`;
