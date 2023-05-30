import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import RouteContainer from "../../routes/RouteContainer";
import { BrowserRouter } from "react-router-dom";
import * as Routepaths from "../../routes/routePaths";
import LoginScreen from "../../screens/Employee/Login/Login";
import NotFound from "../../screens/Common/NotFound/NotFound";

describe("RouteContainer", () => {
  test("Should render login screen route", () => {
    Object.defineProperty(Routepaths, 'RoutePaths', {
      writable: true,
      value: {
        "home": { name: "home", path: "/", container: LoginScreen, protected: false },
      }
    });

    const { getByText } = render(<BrowserRouter>
      <RouteContainer />
    </BrowserRouter>);

    expect(getByText("Sign In")).toBeInTheDocument();
  });

  test("Should not render protected routes", () => {
    Object.defineProperty(Routepaths, 'RoutePaths', {
      writable: true,
      value: {
        "home": { name: "home", path: "/", container: LoginScreen, protected: true },
        "notFound": { name: "notFound", path: "*", container: NotFound, protected: false },
      }
    });

    const {getByText} =  render(<BrowserRouter>
      <RouteContainer />
    </BrowserRouter>);
    
    expect(getByText("Not Found")).toBeInTheDocument();
  });

});