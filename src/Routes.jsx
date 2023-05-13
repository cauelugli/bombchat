import React from "react";
import { useRoutes } from "react-router-dom";
import Room from "./Room";
import Home from "./Home";

const Routes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/room/:roomId", element: <Room /> },
  ]);

  return routes;
};

export default Routes;
