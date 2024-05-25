import { gql } from "@apollo/client";

export const SEARCH_FLIGHT = gql`
  query SearchFlights(
    $departureCity: String!
    $destinationCity: String!
    $date: String!
  ) {
    searchFlights(
      departureCity: $departureCity
      destinationCity: $destinationCity
      date: $date
    ) {
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
