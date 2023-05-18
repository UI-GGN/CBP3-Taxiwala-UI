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
                        element = {routePath.container} path = {routePath.path}
                        isExact = {routePath.isExact} />
                })
            }
        </Routes>
    </>
}

export default RouteContainer;