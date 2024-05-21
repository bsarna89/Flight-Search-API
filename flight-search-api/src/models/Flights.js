import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Flights = sequelize.define("flights", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  flightNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "flight_number",
  },
  airline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureCity: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "departure_city",
  },
  destinationCity: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "destination_city",
  },
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "departure_time",
  },
  arrivalTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "arrival_time",
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  distance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
    allowNull: false,
  },
});
export default Flights;
