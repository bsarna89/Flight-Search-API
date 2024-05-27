import { Flights } from "../models/index.js";
import { calculateCO2 } from "../utils/co2Calculator.js";
import { getCache, setCache } from "../utils/cache.js";
import { Op } from "sequelize";
import logger from "../utils/logger.js";

const searchFlightsResolver = {
  Query: {
    searchFlights: async (_, { departureCity, destinationCity, date }) => {
      try {
        const cacheKey = `searchFlights:${departureCity}:${destinationCity}:${date}`;
        const cachedFlights = await getCache(cacheKey);

        if (cachedFlights) {
          logger.info(
            `Returning cached flights data for ${departureCity} to ${destinationCity} on ${date}`
          );
          return cachedFlights;
        }

        const flights = await Flights.findAll({
          where: {
            departureCity,
            destinationCity,
            departureTime: {
              [Op.between]: [
                new Date(date).setHours(0, 0, 0, 0),
                new Date(date).setHours(23, 59, 59, 999),
              ],
            },
          },
        });

        // Used to simualte Error Handling in React App
        // if (!flights.length) throw new Error("No flights found.");

        const result = flights.map((flight) => ({
          flightNumber: flight.flightNumber,
          airline: flight.airline,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          price: flight.price,
          co2Emissions: calculateCO2(flight.distance),
          departureCity: flight.departureCity,
          destinationCity: flight.destinationCity,
        }));

        await setCache(cacheKey, result);
        logger.info(
          `Returning NOT CACHED flights data for ${departureCity} to ${destinationCity} on ${date}`
        );
        return result;
      } catch (error) {
        logger.error(
          "Error fetching flights for %s to %s on %s: %o",
          departureCity,
          destinationCity,
          date,
          error
        );
        throw new Error("Error fetching flights");
      }
    },
  },
};

export default searchFlightsResolver;
