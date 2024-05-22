import { Flights } from "../models/index.js";
import { calculateCO2 } from "../utils/co2Calculator.js";
import { getCache, setCache } from "../utils/cache.js";
import { Op } from "sequelize";

const searchFlightsResolver = {
  Query: {
    searchFlights: async (_, { departureCity, destinationCity, date }) => {
      try {
        const cacheKey = `searchFlights:${departureCity}:${destinationCity}:${date}`;
        const cachedFlights = await getCache(cacheKey);

        if (cachedFlights) {
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
        return result;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching flights");
      }
    },
  },
};

export default searchFlightsResolver;
