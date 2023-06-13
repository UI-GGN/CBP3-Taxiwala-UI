import { RoutePath } from "../../routes/routePaths";
import AllRequestPage from "../Request/AllRequests/AllRequestPage";
import LoginScreen from "./Login/Login";
import RequestDeclined from "./RequestHome/RequestDeclined";
import RequestHome from "./RequestHome/RequestHome";
import RequestProgress from "./RequestHome/RequestProgress";

export const EmployeeRoutePaths: { [key: string]: RoutePath } = {
  "EmployeeLoginScreen": 
    { name: "loginScreen", path: "/employee/login", container: LoginScreen, protected: false },
  "RequestProgress": { name: "requestprogress", path: "/employee/request/progress",
    container: RequestProgress, protected: false },
  "RequestDeclined": { name: "requestdeclined", path: "/employee/request/declined",
    container: RequestDeclined, protected: false },
  "AllRequests": { name: "AllRequests",path: "/employee/allrequests", container: AllRequestPage, protected: false },
  "EmployeeRequestHome": 
    { name: "requestHomeScreen", path: "/employee/home", container: RequestHome, protected: false }
};