import { useRoutes } from "react-router-dom";
import { lazyLoadRoutes } from "./lazyLoadRoutes.js";

export function RouterElement() {
  const routes = [
    {
      path: "/",
      name: "Home",
      element: lazyLoadRoutes("Home"),
    },
    {
      path: "flights-table",
      name: "Flights Table",
      element: lazyLoadRoutes("FlightsTable"),
    },
    {
      path: "error",
      name: "Error Page",
      element: lazyLoadRoutes("Error"),
    },
  ];

  return useRoutes(routes);
}
