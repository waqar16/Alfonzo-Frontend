import React, { useEffect } from "react";
import {
  FaRegComments,
  FaFileAlt,
  FaCogs,
  FaGraduationCap,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const services = [
  {
    title: "Consultation",
    description:
      "Get expert advice tailored to your needs with our professional consultation services.",
    icon: <FaRegComments className="w-12 h-12 text-white" />,
    aos: "fade-up", // AOS animation
  },
  {
    title: "Document Review",
    description:
      "Our team will review your documents to ensure accuracy and compliance with legal standards.",
    icon: <FaFileAlt className="w-12 h-12 text-white" />,
    aos: "fade-up", // AOS animation
  },
  {
    title: "Custom Solutions",
    description:
      "We provide custom solutions to address specific requirements and challenges you face.",
    icon: <FaCogs className="w-12 h-12 text-white" />,
    aos: "fade-up", // AOS animation
  },
  {
    title: "Training & Workshops",
    description:
      "Participate in training sessions and workshops to enhance your skills and knowledge.",
    icon: <FaGraduationCap className="w-12 h-12 text-white" />,
    aos: "fade-up", // AOS animation
  },
];

const Service = ({ title, description, icon, aos }) => (
  <div
    className="relative p-8 bg-white border border-gray-200 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center"
    data-aos={aos}
    data-aos-duration="1000"
  >
    <div className="relative flex items-center justify-center bg-[#00A8E8] p-4 rounded-full shadow-lg mb-4">
      <div className="absolute inset-0 rounded-full bg-[#00A8E8] opacity-30 blur-md"></div>
      <div className="relative z-10">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-base text-gray-600 text-center">{description}</p>
  </div>
);

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Explore the range of services we offer to support your legal and
            business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Service
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              aos={service.aos}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
