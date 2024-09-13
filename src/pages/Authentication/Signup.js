import React, { useState } from 'react';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleEmailClick = () => {
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    try {
      await axios.post('/signup', data);
      alert('Registration successful');
    } catch (error) {
      console.error('Registration error', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md sm:max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {!showForm ? (
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">Welcome! Begin Your Journey</h2>
            <p className="text-gray-700 mb-6">Create your account quickly and efficiently by choosing your preferred registration method below.</p>
            <div className="flex flex-col space-y-4 mb-6">
              <button
                type="button"
                className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none transition"
              >
                <FaGoogle className="text-lg sm:text-xl" />
                <span className="text-sm sm:text-base">Sign Up with Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none transition"
              >
                <FaLinkedin className="text-lg sm:text-xl" />
                <span className="text-sm sm:text-base">Sign Up with LinkedIn</span>
              </button>
            </div>
            <p className="text-gray-600 mb-4">or</p>
            <button
            type="button"
            onClick={handleEmailClick}
            className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition text-sm sm:text-base"
            >
            Continue with Your Email
            </button>
            <p className="text-gray-500 text-sm mt-4">By registering, you agree to our <a href="#" className="text-gray-900 underline">Terms of Service</a> and <a href="#" className="text-gray-900 underline">Privacy Policy</a>.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Create Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  {...register('name', { required: 'Full name is required' })}
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  {...register('email', { required: 'Email address is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Register as</label>
                <select
                  {...register('userType')}
                  id="userType"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="user">Normal User</option>
                  <option value="member">Member</option>
                  <option value="lawyer">Lawyer</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                  Sign Up
                </button>
              </div>

              <div className="text-sm text-right">
                <a href="#" className="text-gray-500 hover:text-gray-600">Forgot your password?</a>
              </div>

              <div className="text-sm text-center">
                <p className="text-gray-500">Already have an account? <Link to={'/login'} className="text-gray-900 underline">Login</Link></p>
              </div>
            </form>

            {/* CAPTCHA */}
            <div className="mt-6">
              {/* Integrate CAPTCHA here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
