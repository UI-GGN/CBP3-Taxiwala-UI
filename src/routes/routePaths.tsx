import LoginScreen from "../screens/Employee/Login/Login";
import NotFound from "../screens/Common/NotFound/NotFound";
import { EmployeeRoutePaths } from "../screens/Employee/EmployeeRoutePaths";
import AllRequestPage from "../screens/Request/AllRequests/AllRequestPage";

export type RoutePath = {
  name: string;
  path: string;
  container: React.ComponentType<any>;
  protected: boolean;
};

export const RoutePaths: { [key: string]: RoutePath } = {
  home: { name: "home", path: "/", container: LoginScreen, protected: false },
  EmployeeLogin: {
    name: "EmployeeLogin",
    path: "/login",
    container: LoginScreen,
    protected: false,
  },
  AllRequests: {
    name: "AllRequests",
    path: "/requests",
    container: AllRequestPage,
    protected: false,
  },
  notFound: {
    name: "notFound",
    path: "*",
    container: NotFound,
    protected: false,
  },
  ...EmployeeRoutePaths,
};
