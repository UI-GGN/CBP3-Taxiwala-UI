import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RequestHome from "../../../../screens/Employee/RequestHome/RequestHome";

describe("Request Home Screen", () => {

  it("should test if steps increases", () => {
    render(<RequestHome />);
    
    // debug();
    expect(screen.getByText("Looking for office cab?")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Step 1/2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Next"));

    expect(screen.getByText("Step 2/2")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();

  });
});