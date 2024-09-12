import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Navigation Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b-2 border-gray-600 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors duration-300">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors duration-300">Services</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors duration-300">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b-2 border-gray-600 pb-2">Contact Us</h3>
            <p className="text-sm mb-2">
              <span className="font-medium">Address:</span> 123 Business Road, Suite 456, City, Country
            </p>
            <p className="text-sm mb-2">
              <span className="font-medium">Phone:</span> +1 (123) 456-7890
            </p>
            <p className="text-sm mb-4">
              <span className="font-medium">Email:</span> contact@example.com
            </p>
            <a
              href="mailto:contact@example.com"
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
            >
              Send us an email
            </a>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b-2 border-gray-600 pb-2">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b-2 border-gray-600 pb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-600 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Alfonzo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
