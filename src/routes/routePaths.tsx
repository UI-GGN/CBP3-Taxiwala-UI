import LoginScreen from "../screens/login/Login";

type RoutePath = {
    name: string;
    path: string;
    container: React.ComponentType<any>;
    isExact: boolean;
    protected: boolean
}

export const routePaths: { [key: string]: RoutePath } = {
    "home": { name: "home", path: "/", container: <LoginScreen />, isExact: true, protected: false },
    "loginScreen": { name: "home", path: "/login", container: <LoginScreen />, isExact: true, protected: false }
}