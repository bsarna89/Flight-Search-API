import { sequelize } from "../config/db.js";
import logger from "../utils/logger.js";
import Flights from "./Flights.js";

sequelize.sync({ force: false }).then(() => {
  logger.info("Configuration success");
});

export { Flights };
