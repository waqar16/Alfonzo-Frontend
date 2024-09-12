import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const contactInfo = {
  phone: '+1 (123) 456-7890',
  email: 'contact@example.com',
  address: '123 Business Road, Suite 456, City, Country',
  social: [
    { name: 'Facebook', icon: <FaFacebookF className="w-6 h-6 text-blue-600" />, link: 'https://facebook.com' },
    { name: 'Twitter', icon: <FaTwitter className="w-6 h-6 text-blue-400" />, link: 'https://twitter.com' },
    { name: 'LinkedIn', icon: <FaLinkedinIn className="w-6 h-6 text-blue-700" />, link: 'https://linkedin.com' }
  ]
};

const ContactInformation = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demonstration purposes, we'll just show a success message.
    // In a real-world application, you'd send this data to a server.
    setFormStatus('Your message has been sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6">
            We’d love to hear from you! Reach out to us via any of the following methods or use the contact form below.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex items-start space-x-4 transition-transform transform hover:scale-105 hover:shadow-2xl"
            data-aos="fade-up"
          >
            <FaPhoneAlt className="w-8 h-8 text-indigo-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
              <p className="mt-2 text-gray-600">{contactInfo.phone}</p>
            </div>
          </div>

          <div
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex items-start space-x-4 transition-transform transform hover:scale-105 hover:shadow-2xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <FaEnvelope className="w-8 h-8 text-indigo-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Email</h3>
              <p className="mt-2 text-gray-600">{contactInfo.email}</p>
            </div>
          </div>

          <div
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex items-start space-x-4 transition-transform transform hover:scale-105 hover:shadow-2xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FaMapMarkerAlt className="w-8 h-8 text-indigo-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Address</h3>
              <p className="mt-2 text-gray-600">{contactInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">Contact Form</h3>
          <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-200 rounded-lg shadow-lg mx-auto max-w-4xl">
            {formStatus && (
              <div className="mb-4 text-center text-green-600">
                {formStatus}
              </div>
            )}
            <div className="grid gap-6 mb-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 font-semibold">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-semibold">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            {contactInfo.social.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
