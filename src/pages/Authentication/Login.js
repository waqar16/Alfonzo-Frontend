import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {
  handleGoogleFailure,
  loginUser,
} from "../../services/authentication-services";
import Loader from "../../components/Loader/Loader";
import { Toaster } from "react-hot-toast";
import { notify } from "../../utilities/toast";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const recaptchaRef = React.createRef();

  const onSubmit = async (data) => {
    // const captchaValue = recaptchaRef.current.getValue();
    // if (!captchaValue) {
    //   notify("Please verify the reCAPTCHA!", "error");
    // } else {
    //   setLoading(true);
    //   const response = await loginUser(
    //     {
    //       username: data.email,
    //       password: data.password,
    //     },
    //     setLoading
    //   );
    //   console.log("response", response);
    //   if (response.status == 400) {
    //     notify(response.error, "error");
    //   }
    //   if (response?.data?.mfa_required && response?.data.mfa_required == true) {
    //     localStorage.setItem("email", response.data.email);
    //     navigate("/verify-mfa");
    //   }
    //   if (response?.data?.access) {
    //     localStorage.setItem("token", response.data.access);
    //     notify("login succesfull", "success");

    //     setTimeout(() => {
    //       navigate("/profile");
    //     }, 4000);
    //   }
    // }

    const captchaValue = recaptchaRef.current.getValue();

    setLoading(true);
    const response = await loginUser(
      {
        username: data.email,
        password: data.password,
      },
      setLoading
    );
    console.log("response", response);
    if (response.status == 400) {
      notify(response.error, "error");
    }
    if (response?.data?.mfa_required && response?.data.mfa_required == true) {
      localStorage.setItem("email", response.data.email);
      navigate("/verify-mfa");
    }
    if (response?.data?.access) {
      localStorage.setItem("token", response.data.access);
      notify("login succesfull", "success");

      setTimeout(() => {
        navigate("/profile");
      }, 4000);
    }
  };
  const serverUrl = `${process.env.REACT_APP_SERVER_URL}`;

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const access_token = response.access_token;
      try {
        const response = await axios.post(`${serverUrl}/auth/google/`, {
          access_token,
        });
        if (response.status == 200) {
          localStorage.setItem("email", response.data.user.email);
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("firstname", response.data.user.first_name);
          localStorage.setItem("lastname", response.data.user.last_name);
          localStorage.setItem("phone", response.data.user.phone);
          localStorage.setItem("token", response.data.access);
          localStorage.setItem(
            "profilepic",
            response.data.user.profile_picture
          );

          navigate("/profile");
        }
        return { data: response.data, status: response.status };
      } catch (error) {
        console.error(
          "Login error:",
          error.response
            ? error.response.data
            : {
                error: error.message,
                status: 500,
              }
        );
        throw error;
      }
    },
    onError: handleGoogleFailure,
    scope: "openid profile email",
  });
  return (
    <div className="dark:bg-black min-h-screen flex items-start justify-center py-4 pt-24 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div
        className={`w-full max-w-lg  dark:bg-slate-900 bg-white p-8 rounded-lg shadow-lg  `}
      >
        <h2 className="dark:text-white text-3xl font-semibold text-gray-900 mb-6">
          Welcome Back!
        </h2>
        <p className="dark:text-zinc-400 text-gray-700 mb-6">
          Log in to continue where you left off.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label
            htmlFor="email"
            className="dark:text-zinc-400 block text-sm font-medium text-gray-700"
          >
            Email or Username
          </label>
          <div>
            <input
              {...register("email", {
                required: "Email address is required",
              })}
              id="email"
              placeholder="Enter Email or Username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <label
            htmlFor="password"
            className="dark:text-zinc-400 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative flex flex-col ">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 pr-10 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {showPassword ? (
              <FaEye
                className={`text-gray-500 absolute cursor-pointer right-4 top-3`}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEyeSlash
                className={`text-gray-500 absolute cursor-pointer right-4 top-3`}
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-center m-8">
              <ReCAPTCHA
                sitekey="6LeNiVQqAAAAABJ9MDszcbfLBChE8YrGlyAZBL2M"
                ref={recaptchaRef}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              {loading ? <Loader /> : "Log In"}
            </button>
          </div>

          <div className="text-sm text-right">
            <a
              href="#"
              className="dark:text-zinc-400 text-gray-500 hover:text-gray-600"
            >
              Forgot your password?
            </a>
          </div>
        </form>

        <div className="my-6 text-center">
          <p className="text-gray-500">Or log in with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="button"
              onClick={() => {
                googleLogin();
              }}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
            >
              <FaGoogle className="text-xl" />
              <span>Google</span>
            </button>

            <NavLink
              to={"https://waqar123.pythonanywhere.com/auth/linkedin/login/"}
              className="flex items-center justify-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none transition"
            >
              <FaLinkedin className="text-lg sm:text-xl" />
              <span className="text-sm sm:text-base">LinkedIn</span>
            </NavLink>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="dark:text-zinc-400 text-gray-500">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="dark:text-white text-gray-900 underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
