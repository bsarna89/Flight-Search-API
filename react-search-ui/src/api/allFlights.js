import { gql } from "@apollo/client";

export const GET_FLIGHTS = gql`
  query GetFlights {
    allFlights {
      flightNumber
      airline
      departureTime
      arrivalTime
      price
      co2Emissions
      departureCity
      destinationCity
    }
  }
`;
