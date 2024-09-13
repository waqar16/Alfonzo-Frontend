import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('/login', data);
      alert('Login successful');
    } catch (error) {
      console.error('Login error', error);
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Welcome Back!</h2>
        <p className="text-gray-700 mb-6">Log in to continue where you left off.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-3 py-2 pr-10 border border-gray-300 bg-gray-50 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                
                <FaEye className="text-gray-500" />
              ) : (
                <FaEyeSlash className="text-gray-500" />
              )}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Log In
            </button>
          </div>

          <div className="text-sm text-right">
            <a href="#" className="text-gray-500 hover:text-gray-600">Forgot your password?</a>
          </div>
        </form>

        <div className="my-6 text-center">
          <p className="text-gray-500">Or log in with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="button"
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
            >
              <FaGoogle className="text-xl" />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none"
            >
              <FaLinkedin className="text-xl" />
              <span>LinkedIn</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500">Don't have an account? <Link to={'/signup'} className="text-gray-900 underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
