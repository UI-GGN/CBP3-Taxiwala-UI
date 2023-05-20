import LoginScreen from "../screens/Employee/Login/Login";
import NotFound from "../screens/Common/NotFound/NotFound";

type RoutePath = {
    name: string;
    path: string;
    container: React.ComponentType<any>;    
    protected: boolean
}

export const routePaths: { [key: string]: RoutePath } = {
    "home": { name: "home", path: "/", container: LoginScreen, protected: false },
    "loginScreen": { name: "loginScreen", path: "/login", container: LoginScreen, protected: false },
    "notFound": { name: "notFound", path: "*", container: NotFound, protected: false }
}