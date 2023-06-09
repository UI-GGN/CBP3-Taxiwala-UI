import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginScreen from "../../../../screens/Employee/Login/Login";


jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn()
}));

describe("Employee Login Screen", () => {
  test("Should render Sign In text", () => {
    render(<LoginScreen />);

    const text: HTMLElement = screen.getByText(/Sign In/i);

    expect(text).toBeInTheDocument();
  });

  test("Should render text box for email", () => {
    render(<LoginScreen />);

    const emailInput: HTMLElement = screen.getByPlaceholderText(/Enter your work email id/i);

    expect(emailInput).toBeInTheDocument();
  });
});