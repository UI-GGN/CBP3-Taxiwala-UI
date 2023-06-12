import { RoutePath } from "../../routes/routePaths";
import LoginScreen from "./Login/Login";
import RequestHome from "./RequestHome/RequestHome";

export const EmployeeRoutePaths: { [key: string]: RoutePath } = {
  "EmployeeLoginScreen": 
    { name: "loginScreen", path: "/employee/login", container: LoginScreen, protected: false },
  "EmployeeRequestHome": 
    { name: "requestHomeScreen", path: "/employee/home", container: RequestHome, protected: false }
};