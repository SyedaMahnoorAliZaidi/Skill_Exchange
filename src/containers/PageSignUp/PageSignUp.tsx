import React, { FC, useState } from "react";
import { Helmet } from "react-helmet-async";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  onClick,
  ...props
}) => {
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
    const handleContinueClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShowAdditionalFields(true);
  };

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up | TaskEase</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <fieldset className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Select Role
              </span>
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input type="radio" name="role" value="user" className="form-radio" />
                  <span className="ml-2">User</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input type="radio" name="role" value="expert" className="form-radio" />
                  <span className="ml-2">Expert</span>
                </label>
              </div>
            </fieldset>
            <ButtonPrimary type="button"
            className="bg-indigo-600 text-white py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
             onClick={handleContinueClick}>
             Continue
          </ButtonPrimary>
          </form>

          {showAdditionalFields && (
            <form className="grid grid-cols-1 gap-6 mt-6" action="#" method="post">
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  First Name
                </span>
                <Input type="text" placeholder="First Name" className="mt-1" />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Last Name
                </span>
                <Input type="text" placeholder="Last Name" className="mt-1" />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  CNIC
                </span>
                <Input type="text" placeholder="CNIC" className="mt-1" />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Address
                </span>
                <Input type="text" placeholder="Address" className="mt-1" />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Gender
                </span>
                <select className="mt-1 block w-full">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <ButtonPrimary 
              className="bg-indigo-600 text-white py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="submit">Submit</ButtonPrimary>
            </form>
          )}


          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
