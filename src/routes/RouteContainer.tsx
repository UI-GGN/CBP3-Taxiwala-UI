import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePath, RoutePaths } from "./routePaths";

const RouteContainer: React.FC = (): React.ReactElement => {
  const allRoutes: RoutePath[] = Object.values(RoutePaths).filter(
    (route: RoutePath) => !route.protected
  );

  return (
    <>
      <Routes>
        {allRoutes.map((routePath: RoutePath) => {
          return (
            <Route
              key={routePath.name}
              Component={routePath.container}
              path={routePath.path}
            />
          );
        })}
      </Routes>
    </>
  );
};

export default RouteContainer;
