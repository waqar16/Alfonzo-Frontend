import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faAward,
  faUsers,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next"; // Import useTranslation

const companyValues = [
  {
    title: "faq.innovation",
    description: "faq.innovationDescription",
    icon: faLightbulb,
  },
  {
    title: "faq.quality",
    description: "faq.qualityDescription",
    icon: faAward,
  },
  {
    title: "faq.customerCentric",
    description: "faq.customerCentricDescription",
    icon: faUsers,
  },
  {
    title: "faq.integrity",
    description: "faq.integrityDescription",
    icon: faHandshake,
  },
];

const companyStats = [
  { label: "faq.yearsInBusiness", value: 10 },
  { label: "faq.clientsServed", value: 500 },
  { label: "faq.teamMembers", value: 50 },
  { label: "faq.countriesReached", value: 30 },
];

export default function AboutUs() {
  const { t } = useTranslation(); // Get the translation function

  return (
    <div className="dark:bg-black w-full flex flex-col items-center mx-auto py-12 pt-24 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <h1 className="dark:text-white text-4xl font-bold text-center mb-8">
        {t("aboutUs.title")}
      </h1>

      <div className="w-11/12 mx-auto mb-12">
        <p className="dark:text-zinc-400 text-lg text-center mb-6">
          {t("aboutUs.description")}
        </p>
      </div>

      <h2 className="dark:text-white text-3xl font-semibold text-center mb-8">
        {t("aboutUs.historyTitle")}
      </h2>
      <div className="dark:text-zinc-400 w-11/12 mx-auto mb-12">
        <p className="text-lg mb-4">{t("aboutUs.historyPart1")}</p>
        <p className="text-lg mb-4">{t("aboutUs.historyPart2")}</p>
      </div>

      <h2 className="dark:text-white  text-3xl font-semibold text-center mb-8">
        {t("aboutUs.valuesTitle")}
      </h2>
      <div className="w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {companyValues.map((value, index) => (
          <div
            key={index}
            className="dark:bg-slate-900  bg-white shadow-md rounded-lg p-6 text-center"
          >
            <FontAwesomeIcon
              icon={value.icon}
              className="text-4xl mb-4 text-[#00A8E8]"
            />
            <h3 className="dark:text-white text-xl font-semibold mb-2">
              {t(value.title)}
            </h3>
            <p className="dark:text-zinc-400 text-gray-600">
              {t(value.description)}
            </p>
          </div>
        ))}
      </div>

      <h2 className="dark:text-white text-3xl font-semibold text-center mb-8">
        {t("aboutUs.impactTitle")}
      </h2>
      <div className="w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {companyStats.map((stat, index) => (
          <div
            key={index}
            className="dark:bg-slate-900 bg-white shadow-md rounded-lg p-6 text-center"
          >
            <h3 className="dark:text-white text-4xl font-bold mb-2">
              {stat.value}
            </h3>
            <p className="dark:text-zinc-400 text-gray-600">{t(stat.label)}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div className="bg-[#00A8E8] h-2.5 rounded-full w-3/4"></div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="dark:text-white text-3xl font-semibold text-center mb-8">
        {t("aboutUs.missionTitle")}
      </h2>
      <div className="w-11/12 mx-auto mb-12">
        <div className="dark:bg-slate-900 bg-white shadow-md rounded-lg p-6">
          <p className="dark:text-zinc-400  text-lg italic">
            "{t("aboutUs.mission")}"
          </p>
        </div>
      </div>
    </div>
  );
}
