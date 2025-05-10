import React, { FC, useState } from "react";
import { Helmet } from "react-helmet-async";
import Input from "shared/Input/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ children, onClick, ...props }) => {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Expert"); // Separate state for role
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    cnic: "",
    gender: "",
    domain: "",
    yearsOfExperience: 0,
    availability: "",
  });
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    if (!formData.email || !formData.password || !selectedRole) {
      return false;
    }

    if (selectedRole === "Customer" || selectedRole === "Expert") {
      return (
        formData.firstName &&
        formData.lastName &&
        formData.cnic &&
        formData.gender
      );
    }

    if (selectedRole === "Expert") {
      return (
        formData.domain &&
        formData.yearsOfExperience >= 0 &&
        formData.availability
      );
    }

    return true;
  };

  const handleRoleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setSelectedRole(value); // Update the selected role

    // Reset form fields based on role change
    setShowAdditionalFields(false);
    setFormData({
      ...formData,
      firstName: "",
      lastName: "",
      cnic: "",
      gender: "",
      domain: "",
      yearsOfExperience: 0,
      availability: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContinueClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedRole) {
      setShowAdditionalFields(true);
    } else {
      alert("Please select a role first.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }

    const url = `http://localhost:8000/api/create_user/`;
    const payload: any = {
      email: formData.email,
      password: formData.password,
      role: selectedRole, // Ensure "Expert" or "Customer"
      firstname: formData.firstName,
      lastname: formData.lastName,
      cnic: formData.cnic,
      gender: formData.gender,
    };

    if (selectedRole === "Expert") {
      payload.domain = formData.domain;
      payload.years_of_experience = formData.yearsOfExperience;
      payload.availability = formData.availability;
    }

    console.log("Payload being sent:", payload);

    try {
      const response = await axios.post(url, payload);
      if (response.status === 201) {
        alert("User created successfully!");
        navigate("/login");
      } else {
        alert("Error creating user: " + response.data.error);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error occurred while creating user:", error.response?.data);
        alert("Error: " + error.response?.data?.error);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up | TaskEase</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                name="email"
                placeholder="example@example.com"
                className="mt-1"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                name="password"
                className="mt-1"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>

            <fieldset className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Select Role
              </span>
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Customer"
                    className="form-radio"
                    checked={selectedRole === "Customer"}
                    onChange={handleRoleChange}
                  />
                  <span className="ml-2">Customer</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="role"
                    value="Expert"
                    className="form-radio"
                    checked={selectedRole === "Expert"}
                    onChange={handleRoleChange}
                  />
                  <span className="ml-2">Expert</span>
                </label>
              </div>
            </fieldset>
            <ButtonPrimary
              type="button"
              className="bg-indigo-600 text-white py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleContinueClick}
            >
              Continue
            </ButtonPrimary>
          </form>

          {showAdditionalFields && (
            <form className="grid grid-cols-1 gap-6 mt-6" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  First Name
                </span>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="mt-1"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Last Name
                </span>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="mt-1"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">CNIC</span>
                <Input
                  type="text"
                  name="cnic"
                  placeholder="CNIC"
                  className="mt-1"
                  value={formData.cnic}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Gender
                </span>
                <select
                  name="gender"
                  className="mt-1 block w-full"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              {selectedRole === "Expert" && (
                <>
                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Domain
                    </span>
                    <Input
                      type="text"
                      name="domain"
                      placeholder="Your Domain"
                      className="mt-1"
                      value={formData.domain}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Years of Experience
                    </span>
                    <Input
                      type="number"
                      name="yearsOfExperience"
                      placeholder="Years of Experience"
                      className="mt-1"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Availability
                    </span>
                    <Input
                      type="text"
                      name="availability"
                      placeholder="Availability"
                      className="mt-1"
                      value={formData.availability}
                      onChange={handleInputChange}
                    />
                  </label>
                </>
              )}
              <ButtonPrimary
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Sign Up
              </ButtonPrimary>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
