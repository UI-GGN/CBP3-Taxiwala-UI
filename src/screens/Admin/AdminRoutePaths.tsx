import { RoutePath } from "../../routes/routePaths";
import { AdminHome } from "./RequestHome/AdminHome";
import {userType} from "../../constants";

export const AdminRoutePaths: { [key: string]: RoutePath } = {
  "AdminHome": { name: "AdminHome", path: "/admin/home", container: AdminHome, protected: true,
    userType: userType.Admin }
};