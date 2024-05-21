import { sequelize } from "../config/db.js";
import Flights from "./Flights.js";

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables connected!");
});

export { Flights };
