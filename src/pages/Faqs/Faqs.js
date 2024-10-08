import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next"; // Import useTranslation

const faqData = [
  {
    question: "faq.themeDifference",
    answer: "faq.themeDifferenceAnswer",
  },
  {
    question: "faq.supportsPlugins",
    answer: "faq.supportsPluginsAnswer",
  },
  {
    question: "faq.moneybackGuarantee",
    answer: "faq.moneybackGuaranteeAnswer",
  },
  {
    question: "faq.paymentMethods",
    answer: "faq.paymentMethodsAnswer",
  },
  {
    question: "faq.refundSatisfaction",
    answer: "faq.refundSatisfactionAnswer",
  },
  {
    question: "faq.supportMethods",
    answer: "faq.supportMethodsAnswer",
  },
];

export default function FAQ() {
  const { t } = useTranslation(); // Get the translation function
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="dark:bg-black max-w-3xl mx-auto py-12 pt-24 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <h2 className="dark:text-white text-3xl font-bold text-center mb-2">
        {t("faq.title")}
      </h2>
      <p className="dark:text-zinc-400 text-center text-muted-foreground mb-8">
        {t("faq.subtitle")}
      </p>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="dark:text-zinc-400 flex justify-between items-center w-full p-4 text-left"
              onClick={() => toggleQuestion(index)}
            >
              <span className="font-medium">{t(faq.question)}</span>
              <FontAwesomeIcon
                icon={activeIndex === index ? faMinus : faPlus}
                className="text-gray-600"
              />
            </button>
            {activeIndex === index && (
              <div className="p-4 dark:text-zinc-400 dark:bg-black bg-gray-50">
                <p>{t(faq.answer)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
