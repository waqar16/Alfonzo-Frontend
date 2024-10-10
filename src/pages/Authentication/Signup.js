import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {
  handleGoogleFailure,
  handleGoogleSuccess,
  registerUser,
} from "../../services/authentication-services";
import { useGoogleLogin } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { notify } from "../../utilities/toast";

const Signup = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const recaptchaRef = React.createRef();

  const handleEmailClick = () => {
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    // const captchaValue = recaptchaRef.current.getValue();
    // if (!captchaValue) {
    //   alert("Please verify the reCAPTCHA!");
    // } else {
    setLoading(true);
    const signup = await registerUser(
      {
        first_name: data.firstname,
        last_name: data.lastname,
        username: data.username,
        password: data.password,
        password2: data.password2,
        email: data.email,
        phone: data.phone,
        role: data.userType.toUpperCase(),
      },
      setLoading
    );
    console.log(signup);
    if (signup.status == 201) {
      // alert("Form submission successful!");
      navigate("/activation-email-sent");
    } else {
      notify(
        signup.error?.email || signup.error?.username || signup.error?.password,
        "error"
      );
    }
    // }
  };
  const serverUrl = `${process.env.REACT_APP_SERVER_URL}`;

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      // const tokenId = response.credential;
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
      <div className="w-full max-w-md sm:max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {!showForm ? (
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
              Welcome! Begin Your Journey
            </h2>
            <p className="text-gray-700 mb-6">
              Create your account quickly and efficiently by choosing your
              preferred registration method below.
            </p>
            <div className="flex flex-col space-y-4 mb-6">
              <button
                onClick={() => {
                  googleLogin();
                }}
                type="button"
                className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none transition"
              >
                <FaGoogle className="text-lg sm:text-xl" />
                <span className="text-sm sm:text-base">
                  Sign Up with Google
                </span>
              </button>
              <NavLink
                to={"https://waqar123.pythonanywhere.com/auth/linkedin/login/"}
                className="flex items-center justify-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none transition"
              >
                <FaLinkedin className="text-lg sm:text-xl" />
                <span className="text-sm sm:text-base">
                  Sign Up with LinkedIn
                </span>
              </NavLink>
            </div>
            <p className="text-gray-600 mb-4">or</p>
            <button
              type="button"
              onClick={handleEmailClick}
              className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition text-sm sm:text-base"
            >
              Continue with Your Email
            </button>
            <p className="text-gray-500 text-sm mt-4">
              By registering, you agree to our{" "}
              <a href="#" className="text-gray-900 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-gray-900 underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
              Create Your Account
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  {...register("firstname", {
                    required: "First name is required",
                  })}
                  type="text"
                  id="firstname"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  {...register("lastname", {
                    required: "Last name is required",
                  })}
                  type="text"
                  id="lastname"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">
                    {errors.lastname.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  type="text"
                  id="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone No.
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  type="text"
                  id="phone"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div className="">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
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
                    className="w-full px-3 py-2 pr-10 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  {showPassword ? (
                    <FaEye
                      className="text-gray-500 absolute cursor-pointer right-4 top-3"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-gray-500 absolute cursor-pointer right-4 top-3"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("password2", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      validate: (value) =>
                        value === watch("password") || "Passwords must match",
                    })}
                    type={showPassword2 ? "text" : "password"}
                    id="password2"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  {showPassword2 ? (
                    <FaEye
                      className="text-gray-500 absolute cursor-pointer right-4 top-3"
                      onClick={() => setShowPassword2(!showPassword2)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-gray-500 absolute cursor-pointer right-4 top-3"
                      onClick={() => setShowPassword2(!showPassword2)}
                    />
                  )}
                  {errors.password2 && (
                    <p className="text-red-500 text-sm">
                      {errors.password2.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="userType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account Type
                </label>
                <select
                  {...register("userType")}
                  id="userType"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="user">User Account</option>
                  <option value="lawyer">Lawyer Account</option>
                </select>
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
                  {loading ? <Loader /> : "Sign Up"}
                </button>
              </div>

              <div className="text-sm text-right">
                <a href="#" className="text-gray-500 hover:text-gray-600">
                  Forgot your password?
                </a>
              </div>

              <div className="text-sm text-center">
                <p className="text-gray-500">
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-gray-900 underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>

            {/* CAPTCHA */}
            <div className="mt-6">{/* Integrate CAPTCHA here */}</div>
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default Signup;
