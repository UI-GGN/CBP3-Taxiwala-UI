import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "../../../../screens/Common/NotFound/NotFound";


describe("Not Found Screen", () => {
  test("Should not found text", () => {
    render(<NotFound />);

    const text: HTMLElement = screen.getByText(/Not Found/i);

    expect(text).toBeInTheDocument();
  });
});