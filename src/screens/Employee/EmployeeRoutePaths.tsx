import { RoutePath } from "../../routes/routePaths";
import AllRequestPage from "./AllRequests/AllRequestPage";
import LoginScreen from "./Login/Login";
import RequestHome from "./RequestHome/RequestHome";
import Request from "./RequestHome/Request";

export const EmployeeRoutePaths: { [key: string]: RoutePath } = {
  "EmployeeLoginScreen": 
    { name: "loginScreen", path: "/employee/login", container: LoginScreen, protected: false },
  "AllRequests": { name: "AllRequests",path: "/employee/allrequests/:id", container: AllRequestPage, protected: false },
  "Request": { name: "request", path: "/employee/request/:empId/:routeId",
    container: Request, protected: false },
  "EmployeeRequestHome": 
    { name: "requestHomeScreen", path: "/employee/home", container: RequestHome, protected: false },
};