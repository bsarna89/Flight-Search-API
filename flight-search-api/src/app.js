import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/schema.js";
import { sequelize } from "./config/db.js";
import resolvers from "./resolvers/index.js";

const app = express();

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.json());

  sequelize
    .authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));

  const PORT = process.env.PORT || 4002;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
export default app;
