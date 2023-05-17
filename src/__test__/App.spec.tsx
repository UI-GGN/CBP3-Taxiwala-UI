import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

describe("Should render App component", () => {
  test("Should render button with 0 count", () => {
    render(<App />);
    const countButton: HTMLElement = screen.getByRole("button", {name: /count is 0/i}); 

    expect(countButton).toBeInTheDocument();
  });

  test("Should update count when button is clicked", () => {
    render(<App />);
    const countButton: HTMLElement = screen.getByRole("button", {name: /count is 0/i}); 

    fireEvent.click(countButton);

    expect(countButton).toHaveTextContent("count is 1");
  });


});