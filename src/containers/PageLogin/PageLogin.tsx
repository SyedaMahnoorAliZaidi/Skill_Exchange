import React, { FC, useState } from "react";
import { Helmet } from "react-helmet-async";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";


export interface PageLoginProps {
  className?: string;
}
  const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  
  
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login | TaskEase</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
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
                <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link>
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <ButtonPrimary type="button" > Continue
          </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/signup">Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
