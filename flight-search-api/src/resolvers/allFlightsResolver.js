import { Flights } from "../models/index.js";
import { calculateCO2 } from "../utils/co2Calculator.js";
import { getCache, setCache } from "../utils/cache.js";
import logger from "../utils/logger.js";

const allFlightsResolver = {
  Query: {
    allFlights: async () => {
      try {
        const cacheKey = "allFlights";
        const cachedFlights = await getCache(cacheKey);

        if (cachedFlights) {
          logger.info("Returning cached all flights data");
          return cachedFlights;
        }

        const flights = await Flights.findAll();
        if (!flights.length) throw new Error("No flights found.");

        const result = flights.map((flight) => ({
          flightNumber: flight.flightNumber,
          airline: flight.airline,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          price: flight.price,
          co2Emissions: calculateCO2(flight.distance),
        }));

        await setCache(cacheKey, result);
        logger.info("Returning NOT CACHED all flights data");
        return result;
      } catch (error) {
        logger.error("Error fetching all flights: %o", error);
        throw new Error("Error fetching flights");
      }
    },
  },
};

export default allFlightsResolver;
