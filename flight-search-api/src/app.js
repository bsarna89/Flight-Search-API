import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/schema.js";
import { sequelize } from "./config/db.js";
import resolvers from "./resolvers/index.js";
import logger from "./utils/logger.js";

const app = express();

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.json());

  app.use((err, _req, res, _next) => {
    logger.error("Express error handler: %o", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  sequelize
    .authenticate()
    .then(() => logger.info("Database connected..."))
    .catch((err) => logger.error("Database connection error: %o", err));

  const PORT = process.env.PORT || 4002;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

startServer();
export default app;
