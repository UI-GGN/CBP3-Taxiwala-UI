import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";

const RouteContainer: React.FC = (): React.ReactElement => {
    const allRoutes = Object.values(RoutePaths).filter(route => !route.protected);

    return <>
        <Routes>
            {
                allRoutes.map(routePath => {
                    return <Route key = {routePath.name}
                        Component = {routePath.container} path = {routePath.path} />
                })
            }
        </Routes>
    </>
}

export default RouteContainer;