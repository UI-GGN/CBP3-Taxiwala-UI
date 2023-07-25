import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "../screens/Employee/Login/Login";
import { RoutePath, RoutePaths } from "./routePaths";
import jwt_decode from "jwt-decode";

const RouteContainer: React.FC = (): React.ReactElement => {
  const allRoutes: RoutePath[] = Object.values(RoutePaths);

  return <>
    <Routes>
      {
        allRoutes.map((routePath: RoutePath) => {                    
          if(routePath.protected) {
            const usertoken = localStorage.getItem("usertoken");            
            if(!usertoken || usertoken == undefined){
              return <Route key="home"
                Component = {LoginScreen} path = "/" />;
            }
            const userTokenDecoded = jwt_decode(usertoken);
            if(userTokenDecoded && userTokenDecoded.usertype !== routePath.userType) {
              return <Route key="home"
                Component = {LoginScreen} path = "/" />;
            }
          }
          return <Route key = {routePath.name}
            Component = {routePath.container} path = {routePath.path} />;
        })
      }
    </Routes>
  </>;
};

export default RouteContainer;
