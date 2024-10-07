import React, { useEffect } from "react";
import {
  FaRegComments,
  FaFileAlt,
  FaCogs,
  FaGraduationCap,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useTranslation } from "react-i18next"; // Import useTranslation

const Services = () => {
  const { t } = useTranslation(); // Get the translation function

  const services = [
    {
      title: t("service.consultation"),
      description: t("service.consultationDesc"),
      icon: <FaRegComments className="w-12 h-12 text-white" />,
      aos: "fade-up", // AOS animation
    },
    {
      title: t("service.documentReview"),
      description: t("service.documentReviewDesc"),
      icon: <FaFileAlt className="w-12 h-12 text-white" />,
      aos: "fade-up", // AOS animation
    },
    {
      title: t("service.customSolutions"),
      description: t("service.customSolutionsDesc"),
      icon: <FaCogs className="w-12 h-12 text-white" />,
      aos: "fade-up", // AOS animation
    },
    {
      title: t("service.trainingWorkshops"),
      description: t("service.trainingWorkshopsDesc"),
      icon: <FaGraduationCap className="w-12 h-12 text-white" />,
      aos: "fade-up", // AOS animation
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-12 dark:bg-black bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mt-12 dark:text-white text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {t("service.ourServices")}
          </h2>
          <p className="dark:text-zinc-400  mt-4 text-base leading-7 text-gray-600">
            {t("service.explore")}
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

const Service = ({ title, description, icon, aos }) => (
  <div
    className="dark:border-none dark:bg-slate-900 relative p-8 bg-white border border-gray-200 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center"
    data-aos={aos}
    data-aos-duration="1000"
  >
    <div className="relative flex  items-center justify-center bg-[#00A8E8] p-4 rounded-full shadow-lg mb-4">
      <div className="absolute inset-0 rounded-full bg-[#00A8E8] opacity-30 blur-md"></div>
      <div className="relative z-10">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold dark:text-white text-gray-900 text-center">
      {title}
    </h3>
    <p className="mt-2 text-base dark:text-zinc-400 text-gray-600 text-center">
      {description}
    </p>
  </div>
);

export default Services;
