import React from "react";
import { Route, Routes } from "react-router-dom";
import { routePaths } from "./routePaths";

const RouteContainer: React.FC = (): React.ReactElement => {
    const allRoutes = Object.values(routePaths);

    return <>
        <Routes>
            {
                allRoutes.map(routePath => {
                    return <Route key = {routePath.path}
                        Component = {routePath.container} path = {routePath.path}
                        exact = {routePath.isExact} />
                })
            }
        </Routes>
    </>
}

export default RouteContainer;