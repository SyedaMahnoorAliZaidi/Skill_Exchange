// import React, { FC, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import Input from "shared/Input/Input";
// import { Link } from "react-router-dom";
// import ButtonPrimary from "shared/Button/ButtonPrimary";


// export interface PageLoginProps {
//   className?: string;
// }
//   const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  
  
//   return (
//     <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
//       <Helmet>
//         <title>Login | TaskEase</title>
//       </Helmet>
//       <div className="container mb-24 lg:mb-32">
//         <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
//           Login
//         </h2>
//         <div className="max-w-md mx-auto space-y-6">
//           {/* FORM */}
//           <form className="grid grid-cols-1 gap-6" action="#" method="post">
//             <label className="block">
//               <span className="text-neutral-800 dark:text-neutral-200">
//                 Email address
//               </span>
//               <Input
//                 type="email"
//                 placeholder="example@example.com"
//                 className="mt-1"
//               />
//             </label>
//             <label className="block">
//               <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
//                 Password
//                 <Link to="/forgot-pass" className="text-sm">
//                   Forgot password?
//                 </Link>
//               </span>
//               <Input type="password" className="mt-1" />
//             </label>
//             <ButtonPrimary type="button" > Continue
//           </ButtonPrimary>
//           </form>

//           {/* ==== */}
//           <span className="block text-center text-neutral-700 dark:text-neutral-300">
//             New user? {` `}
//             <Link to="/signup">Create an account</Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { FC, useState } from "react";
import { Helmet } from "react-helmet-async";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import axios from "axios";

export interface PageLoginProps {
  className?: string;
}

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const [username, setUsername] = useState(""); // changed from email to username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        email: username, // Django expects "username"
        password: password,
      });

      const { access, refresh } = response.data;

      // Store tokens
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      setError(""); // Clear errors
      navigate("/dashboard"); // Redirect
    } catch (err: any) {
      console.error(err);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login | TaskEase</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl md:text-5xl font-semibold justify-center text-neutral-900 dark:text-neutral-100">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Username
              </span>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
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
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </label>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user?{" "}
            <Link to="/signup">Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;


