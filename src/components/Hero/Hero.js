import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center bg-gray-900">
      <div className="relative w-full h-full sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-xl mx-auto text-center lg:max-w-md xl:max-w-xl lg:text-left lg:mx-0">
          <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl xl:leading-tight">
            Build SaaS Landing Page without Writing a Single Code
          </h1>
          <p className="mt-8 text-base font-normal leading-7 text-gray-400 lg:max-w-md xl:pr-0 lg:pr-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nunc nisl eu consectetur. Mi massa elementum odio eu viverra amet.
          </p>

          <div className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start">
            <Link
              to={"/signup"}
              title="Sign Up"
              className="
                inline-flex items-center justify-center
                px-3 py-3 text-base font-bold leading-7 text-gray-900
                transition-all duration-200 bg-white border border-transparent rounded-md
                sm:px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
                hover:bg-gray-200
              "
              role="button"
            >
              Sign Up
            </Link>

            <a
              href="#"
              title="Learn More"
              className="
                inline-flex items-center justify-center
                px-2 py-3 text-base font-bold leading-7 text-white
                transition-all duration-200 bg-transparent border border-transparent rounded-md
                sm:px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-700
                hover:bg-gray-700
              "
              role="button"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* <div className="mt-8 lg:hidden">
          <img
            className="object-cover w-full h-full"
            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/bg.png"
            alt="Hero Background"
          />
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
