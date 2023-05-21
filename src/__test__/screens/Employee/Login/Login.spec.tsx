import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginScreen from "../../../../screens/Employee/Login/Login";


describe("Employee Login Screen", () => {
  test("Should render login screen text", () => {
    render(<LoginScreen />);

    const text: HTMLElement = screen.getByText(/Employee Login Screen/i);

    expect(text).toBeInTheDocument();
  });
});