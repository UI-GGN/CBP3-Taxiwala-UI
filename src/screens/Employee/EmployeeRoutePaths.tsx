import { RoutePath } from "../../routes/RoutePaths";
import LoginScreen from "./Login/Login";

export const EmployeeRoutePaths: { [key: string]: RoutePath } = {
    "EmployeeLoginScreen": { name: "loginScreen", path: "/employee/login", container: LoginScreen, protected: false },
}