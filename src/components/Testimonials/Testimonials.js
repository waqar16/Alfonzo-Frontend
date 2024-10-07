import React, { useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

// Define testimonials data
const testimonials = [
  {
    name: "John Doe",
    title: "CEO, Tech Innovations",
    quote:
      "This product has revolutionized our business operations. The level of detail and thought put into the features is remarkable.",
    image: "https://via.placeholder.com/80x80?text=John+Doe",
  },
  {
    name: "Jane Smith",
    title: "Marketing Director, Creative Solutions",
    quote:
      "An essential tool for any modern business. The intuitive interface and powerful analytics are game-changers.",
    image: "https://via.placeholder.com/80x80?text=Jane+Smith",
  },
  {
    name: "Robert Brown",
    title: "Product Manager, BrightTech",
    quote:
      "Incredible value and efficiency. The customer support is outstanding, and the results speak for themselves.",
    image: "https://via.placeholder.com/80x80?text=Robert+Brown",
  },
];

const TestimonialCard = ({ name, title, quote, image }) => (
  <div
    className="dark:bg-slate-900 dark:border-none relative p-8 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden group hover:bg-gray-100 transition-colors duration-300"
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    <div className="flex items-center mb-4">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-md"
      />
      <div className="ml-4">
        <h3 className="text-lg font-semibold dark:text-white text-gray-900">
          {name}
        </h3>
        <p className="dark:text-zinc-300 text-sm text-gray-600">{title}</p>
      </div>
    </div>
    <div className="relative mt-4">
      <FaQuoteLeft className="dark:text-zinc-200 absolute top-0 left-0 w-8 h-8 text-gray-300 opacity-50 transform -translate-x-4 -translate-y-4" />
      <FaQuoteRight className="dark:text-zinc-200 absolute bottom-0 right-0 w-8 h-8 text-gray-300 opacity-50 transform translate-x-4 translate-y-4" />
      <p className="text-base dark:text-zinc-300 text-gray-700 italic relative z-10">
        {quote}
      </p>
    </div>
  </div>
);

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="dark:bg-black py-12 bg-gray-100 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="dark:text-white text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
            What Our Clients Say
          </h2>
          <p className="dark:text-zinc-400 mt-4 text-base leading-7 text-gray-600 sm:mt-8">
            Hear from some of our satisfied customers and how our solutions have
            impacted their businesses.
          </p>
        </div>

        <div className="mt-10 grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              title={testimonial.title}
              quote={testimonial.quote}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
