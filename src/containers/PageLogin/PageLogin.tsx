import React, { FC, useState } from "react";
import { Helmet } from "react-helmet-async";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import axios from "axios";
import { useAuth } from "context/AuthContext";

export interface PageLoginProps {
  className?: string;
}

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Define response structure explicitly
      // const response = await axios.post<{
      //   access: string;
      //   refresh: string;
      //   email: string;
      //   role: string;
      // }>("http://localhost:8000/login/", {
      //   email,
      //   password,
      // });

      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });
      
  
      console.log("Login API response:", response.data);
  
      const { access, refresh, email: userEmail, role } = response.data;
      console.log("Access Token:", access);
console.log("Refresh Token:", refresh);
console.log("User Email:", userEmail);
console.log("User Role:", role);

  
      if (!access || !refresh || !userEmail || !role) {
        throw new Error("Invalid response from server.");
      }
  
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
  
      login({ email: userEmail, role });
      
      // Route based on user role
      if (role === 'Customer') {
        navigate("/customer-home");
      } else {
        navigate("/adminHomepage");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid credentials");
    }
  };
  

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login | TaskEase</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 text-3xl md:text-5xl font-semibold text-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
            <label>
              <span>Email address</span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="mt-1"
                required
              />
            </label>
            <label>
              {/* <span className="flex justify-between items-center">
                Password
                <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link>
              </span> */}
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </label>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <ButtonPrimary type="submit">Login</ButtonPrimary>
          </form>
          <span className="block text-center">
            New user? <Link to="/signup">Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
