import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import Form from "./Form";

// Mock axios.post to return a successful response
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValue({
  data: { message: "Form data submitted successfully." },
});

describe("Form Component", () => {
  it("renders the form inputs correctly", () => {
    render(<Form />);
    // Check if all input elements are rendered
    expect(screen.getByLabelText(/Your Pet's Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/What Type of Pet\?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/How Old Are They\?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Visited Us Before\?/i)).toBeInTheDocument();
    // Check if the submit button is rendered
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  it("displays validation errors on invalid form submission", async () => {
    render(<Form />);

    // Submit the form without filling any fields
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Wait for the error messages to appear
    await waitFor(() => {
      expect(
        screen.getByText(/Please enter your pet's name/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Please enter the type of pet/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Please enter your pets age/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Please enter a valid email/i)
      ).toBeInTheDocument();
    });
  });
});
