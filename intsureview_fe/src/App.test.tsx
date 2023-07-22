import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("renders company name in header", () => {
  render(<App />);
  const companyNameElement = screen.getByText(/Fur Sure Groomers/i);
  expect(companyNameElement).toBeInTheDocument();
});
