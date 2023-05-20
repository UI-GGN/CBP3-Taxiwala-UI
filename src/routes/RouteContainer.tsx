import React from "react";
import { Route, Routes } from "react-router-dom";
import { routePaths } from "./RoutePaths";

const RouteContainer: React.FC = (): React.ReactElement => {
    const allRoutes = Object.values(routePaths).filter(route => !route.protected);

    return <>
        <Routes>
            {
                allRoutes.map(routePath => {
                    return <Route key = {routePath.path}
                        Component = {routePath.container} path = {routePath.path} />
                })
            }
        </Routes>
    </>
}

export default RouteContainer;