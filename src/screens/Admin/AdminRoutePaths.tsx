import { RoutePath } from "../../routes/routePaths";
import { AdminHome } from "./RequestHome/AdminHome";

export const AdminRoutePaths: { [key: string]: RoutePath } = {
  "AdminHome": { name: "AdminHome", path: "/admin/home", container: AdminHome, protected: false}
};