import React, { useState } from "react";
import axios from "axios";
import { FormData } from "../../../types";
import "./Form.css";

const Form: React.FC = () => {
  // Using this array to map the y/n options to the dropdown selection. Might be overkill but will keep in case we want to handle more options
  const newCustomerOptions = ["yes", "no"];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    age: 0,
    email: "",
    newCustomer: "",
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedFormData, setSubmittedFormData] = useState<FormData | null>(
    null
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Form validation function
  const validateForm = () => {
    // This object will store form validation errors
    const formErrors: { [key: string]: string } = {};

    // Validate the 'name' input field
    if (formData.name.trim() === "") {
      formErrors.name = "Please enter your pet's name";
    }

    // Validate the 'type' input field
    if (formData.type.trim() === "") {
      formErrors.type = "Please enter the type of pet";
    }

    // Validate the 'age' input field
    if (formData.age === 0) {
      formErrors.age = "Please enter your pets age";
    }

    // Validate the 'email' input field
    function validateEmail(email: string): boolean {
      // Using regex from stack overflow to handle a truly valid email
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
    if (!validateEmail(formData.email)) {
      formErrors.email = "Please enter a valid email";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  // This is the entry port for the backend
  const BASE_URL = "http://localhost:8000/";

  // Event handler for form submission
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formDataToSend = {
      name: formData.name,
      type: formData.type,
      age: formData.age,
      email: formData.email,
      newCustomer: formData.newCustomer,
    };

    axios
      .post(`${BASE_URL}api/form-submission/`, formDataToSend)
      .then((response) => {
        // Logging the backend response here
        console.log("Backend response:", response.data);
        setSubmittedFormData(formData);
        setIsSubmitted(true);
      })
      .catch((error) => {
        // Logging any errors that occur during the request
        console.error("Error submitting form:", error);
      });

    setFormData({ name: "", type: "", age: 0, email: "", newCustomer: "" });
    setErrors({});
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <main className="main">
      {isSubmitted ? (
        <div>
          <h2>Thank you for submitting the form!</h2>
          <p>Pet's Name: {submittedFormData?.name}</p>
          <p>Pet's Type: {submittedFormData?.type}</p>
          <p>Pet's Age: {submittedFormData?.age}</p>
          <p>Email: {submittedFormData?.email}</p>
          <p>Visited Us Before? {submittedFormData?.newCustomer}</p>
        </div>
      ) : (
        <form className="formContainer">
          <div className="test">
            <label htmlFor="name">Your Pet's Name</label>
            <input
              required
              className="inputStyle"
              id="name"
              type="text"
              placeholder="e.g. Fido"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="errorMsg">{errors.name}</span>}
          </div>

          <div>
            <label htmlFor="type">What Type of Pet?</label>
            <input
              required
              className="inputStyle"
              id="type"
              type="text"
              placeholder="e.g. Cat"
              value={formData.type}
              onChange={handleChange}
            />
            {errors.type && <span className="errorMsg">{errors.type}</span>}
          </div>

          <div>
            <label htmlFor="age">How Old Are They?</label>
            <input
              required
              className="inputStyle"
              id="age"
              type="number"
              min="0"
              placeholder="Age"
              value={Number(formData.age)}
              onChange={handleChange}
            />
            {errors.age && <span className="errorMsg">{errors.age}</span>}
          </div>

          <div>
            <label htmlFor="type">Your Email</label>
            <input
              required
              className="inputStyle"
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="errorMsg">{errors.email}</span>}
          </div>

          <label htmlFor="newCustomer">Visited Us Before?</label>
          <select
            id="newCustomer"
            value={formData.newCustomer}
            onChange={handleChange}
            className="newCustomer-dropdown"
          >
            <option>Select Option</option>
            {newCustomerOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button className="submitButton" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      )}
    </main>
  );
};

export default Form;
