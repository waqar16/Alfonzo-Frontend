import React, { useEffect } from "react";
import TemplatesLeftSection from "../../components/Templates/TemplatesLeftSection";
import TemplatesRightSection from "../../components/Templates/TemplatesRightSection";
import { FaTimes } from "react-icons/fa";
import { faqWithLegalAgreementsArray } from "../../constants/global";
import { fetchTemplates } from "../../services/template-services";

const Templates = () => {
  const [searchClicked, setSearchCLicked] = React.useState(false);
  const [templates, setTemplates] = React.useState(faqWithLegalAgreementsArray);
  const [apiTemplates, setApiTemplates] = React.useState([] || null);
  const [searchTemplates, setSearchTemplates] = React.useState(apiTemplates);
  const [viewingtemplates, setViewingTemplates] = React.useState();

  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const templatess = async () => {
      const templates = await fetchTemplates(setLoading);
      console.log("templates", templates);
      setApiTemplates(templates.data.results);
      setViewingTemplates(templates.data.results);
    };
    templatess();
  }, []);
  const searchTemplate = (text) => {
    const filteredTemplates = apiTemplates.filter((template) => {
      const titleMatch = template.name
        .toLowerCase()
        .includes(text.toLowerCase());

      const faqMatch = apiTemplates.question.some((faqItem) =>
        faqItem.question.toLowerCase().includes(text.toLowerCase())
      );

      const type = apiTemplates.category
        .toLowerCase()
        .includes(text.toLowerCase());

      // If any field matches, return true for this template
      return titleMatch || faqMatch || type;
    });

    setSearchTemplates(filteredTemplates);
  };
  const groupedTemplates = apiTemplates.reduce((acc, template) => {
    const { category } = template;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(template);
    return acc;
  }, {});
  return (
    <div className="dark:bg-black bg-white w-full flex flex-col items-center  pt-32 px-8 relative py-12">
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between">
        <div className=" flex flex-col items-start">
          <h1 className="w-full dark:text-white items-center md:text-start text-center text-slate-900 text-title-xl2 font-bold">
            Templates
          </h1>
          <p className="w-full md:mt-0 mt-4 dark:text-zinc-400">
            Select a ready-to-use template
          </p>
        </div>
        <div
          onClick={() => setSearchCLicked(true)}
          className="mt-4 md:mt-0 w-[300px] flex flex-row items-center   border border-current p-2 rounded-md px-4 cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              d="M21 21L15.5 15.5M17 10C17 12.1217 16.1571 14.1566 14.6569 15.6569C13.1566 17.1571 11.1217 18 9 18C6.87827 18 4.84344 17.1571 3.34315 15.6569C1.84285 14.1566 1 12.1217 1 10C1 7.87827 1.84285 5.84344 3.34315 4.34315C4.84344 2.84285 6.87827 2 9 2C11.1217 2 13.1566 2.84285 14.6569 4.34315C16.1571 5.84344 17 7.87827 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="ml-2 mr-12">Looking For...</p>
           
        </div>
      </div>
      {searchClicked && (
        <div className="z-50 bg-opacity-65 bg-black absolute  top-[-128px]   w-full h-[100vh]  flex flex-col items-center justify-center">
          <div className="bg-white w-11/12 md:w-8/12 flex flex-col items-center p-4 rounded-xl">
            <div className="w-full flex flex-row items-center justify-end">
              <FaTimes
                className="cursor-pointer"
                onClick={() => setSearchCLicked(false)}
              />
            </div>
            <div className="relative w-full mt-4">
              <span className="absolute left-4.5 top-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    d="M21 21L15.5 15.5M17 10C17 12.1217 16.1571 14.1566 14.6569 15.6569C13.1566 17.1571 11.1217 18 9 18C6.87827 18 4.84344 17.1571 3.34315 15.6569C1.84285 14.1566 1 12.1217 1 10C1 7.87827 1.84285 5.84344 3.34315 4.34315C4.84344 2.84285 6.87827 2 9 2C11.1217 2 13.1566 2.84285 14.6569 4.34315C16.1571 5.84344 17 7.87827 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                onChange={(e) => {
                  searchTemplate(e.target.value);
                }}
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Search what u looking for"
              />
            </div>
            <div className="flex flex-col items-center w-full  max-h-[300px] overflow-y-scroll px-2">
              {searchTemplates.length > 0 ? (
                <>
                  {searchTemplates.map((template) => (
                    <div className="mt-2 rounded-lg w-full p-2 fllex flex-col items-center border border-gray-200 cursor-pointer hover:border-white hover:text-white  hover:bg-gray-700 transition-all duration-300">
                      <h2 className="text-md font-bold">{template.title}</h2>
                      <p className="line-clamp-1 text-sm">
                        {template.endingText}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <p className="py-2">No templates found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {apiTemplates && apiTemplates.length > 0 && (
        <div className="w-full grid grid-cols-8 md:gap-x-8">
          <TemplatesLeftSection
            allTemplates={apiTemplates}
            templates={groupedTemplates}
            setViewingTemplates={setViewingTemplates}
          />
          {viewingtemplates && viewingtemplates.length > 0 && (
            <TemplatesRightSection templates={viewingtemplates} />
          )}
        </div>
      )}
      {apiTemplates && apiTemplates.length < 1 && (
        <div className="w-full flex flex-col items-center">
          <h1 className="text-center ">No Templates to show</h1>
        </div>
      )}
    </div>
  );
};

export default Templates;
