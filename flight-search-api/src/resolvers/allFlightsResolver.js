import { Flights } from "../models/index.js";
import { calculateCO2 } from "../utils/co2Calculator.js";

const allFlightsResolver = {
  Query: {
    allFlights: async () => {
      try {
        const flights = await Flights.findAll();
        if (!flights.length) throw new Error("No flights found.");

        return flights.map((flight) => ({
          flightNumber: flight.flightNumber,
          airline: flight.airline,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          price: flight.price,
          co2Emissions: calculateCO2(flight.distance),
        }));
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching flights");
      }
    },
  },
};

export default allFlightsResolver;