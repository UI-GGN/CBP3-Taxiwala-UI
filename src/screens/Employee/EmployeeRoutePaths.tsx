import { RoutePath } from "../../routes/routePaths";
import AllRequestPage from "./AllRequests/AllRequestPage";
import RequestHome from "./RequestHome/RequestHome";
import Request from "./RequestHome/Request";
import { userType } from "../../constants";
import ProfileScreen from "./Profile/Profile";

export const EmployeeRoutePaths: { [key: string]: RoutePath } = {
  "AllRequests": { name: "AllRequests",path: "/employee/allrequests/", container: AllRequestPage, protected: true,
    userType: userType.Employee },
  "Request": { name: "request", path: "/employee/request/:routeId",
    container: Request, protected: true, userType: userType.Employee },
  "EmployeeRequestHome": 
    { name: "requestHomeScreen", path: "/employee/home", container: RequestHome, protected: true,
      userType: userType.Employee },
  "ProfileScreen": 
    { name: "profilescreen", path: "/employee/profile", container: ProfileScreen, protected: false,
      userType: userType.Employee }
};