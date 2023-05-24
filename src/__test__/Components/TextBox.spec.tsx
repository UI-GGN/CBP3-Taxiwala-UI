import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput from '../../Components/TextInput/TextInput';


describe("Test Input tests", () => {
  const handleChange = jest.fn();
  test("Should render text input", () => {
    render(<TextInput 
        placeholder="Enter email" 
        type="email"
        handleChange={handleChange}
        styles={{}} 
    />);

    const emailInput: HTMLElement = screen.getByPlaceholderText(/Enter email/i);

    expect(emailInput).toBeInTheDocument();
  });

  test("Should be able to type in text input box", () => {
    render(<TextInput 
        placeholder="Enter email" 
        type="email"
        handleChange={handleChange}
        styles={{}} 
    />);
    const emailInput: HTMLElement = screen.getByPlaceholderText(/Enter email/i);
    const email: string = 'CBP@gmail.com';

    expect(emailInput).toHaveValue('');

    fireEvent.change(emailInput, {target: {value: email}});
    
    expect(emailInput).toHaveValue(email);
  });
});