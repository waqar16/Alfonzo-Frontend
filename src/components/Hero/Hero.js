import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="relative bg-white text-gray-900 overflow-hidden h-screen">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-1/2 text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            d="M0,256L30,240C60,224,120,192,180,186.7C240,181,300,199,360,213.3C420,224,480,224,540,229.3C600,235,660,245,720,240C780,235,840,213,900,186.7C960,160,1020,128,1080,128C1140,128,1200,160,1260,186.7C1320,213,1380,235,1410,245L1440,256Z"
          />
        </svg>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-black animate-fade-in" style={{ lineHeight: '1.2' }}>
          Elevate Your Legal Practice with Confidence
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-gray-700 animate-fade-in" style={{ lineHeight: '1.5' }}>
          Experience unparalleled efficiency and security with our state-of-the-art solutions tailored for legal professionals.
        </p>
        <div className="mt-8 flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <a
            href="#signup"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-black rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 animate-button"
          >
            Get Started <FaArrowRight className="inline-block ml-2" />
          </a>
          <a
            href="#learn-more"
            className="inline-block px-6 py-3 text-lg font-semibold text-black border border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 animate-button"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
