import React from "react";
import {
  FaRocket,
  FaStar,
  FaUserShield,
  FaHandHoldingUsd,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const features = [
  {
    title: "Fast and Reliable",
    description: "Experience quick performance and reliable service with our optimized infrastructure.",
    icon: <FaRocket className="w-12 h-12 text-white" />,
    aos: "fade-up",
  },
  {
    title: "User-Friendly Interface",
    description: "Navigate easily with our intuitive and user-friendly interface designed for all skill levels.",
    icon: <FaStar className="w-12 h-12 text-white" />,
    aos: "fade-up",
  },
  {
    title: "Secure and Private",
    description: "Your data is protected with the latest security measures to ensure privacy and safety.",
    icon: <FaUserShield className="w-12 h-12 text-white" />,
    aos: "fade-up",
  },
  {
    title: "24/7 Support",
    description: "Our dedicated support team is available 24/7 to help with any questions or issues.",
    icon: <FaHandHoldingUsd className="w-12 h-12 text-white" />,
    aos: "fade-up",
  },
];

const Feature = ({ title, description, icon, aos }) => (
  <div
    className="relative p-8 bg-white border border-gray-200 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center"
    data-aos={aos}
    data-aos-duration="1000"
  >
    <div className="relative flex items-center justify-center bg-[#00A8E8] p-4 rounded-full shadow-lg mb-4">
      <div className="absolute inset-0 rounded-full bg-[#00A8E8] opacity-20 blur-md"></div>
      <div className="relative z-10">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-base text-gray-700 text-center">{description}</p>
  </div>
);

const Features = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-12 bg-gray-100 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
            Our Key Features
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8">
            Discover the powerful features that set our app apart and help you
            achieve your goals more effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-4 md:gap-8 xl:mt-24">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              aos={feature.aos}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
