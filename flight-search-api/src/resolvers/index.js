import allFlightsResolver from "./allFlightsResolver.js";
import searchFlightsResolver from "./searchFlightResolver.js";

const resolvers = {
    Query: {
        ...allFlightsResolver.Query,
        ...searchFlightsResolver.Query
      },
}

export default resolvers;