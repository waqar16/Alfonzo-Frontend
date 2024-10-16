import React, { useEffect } from "react";
import TemplatesLeftSection from "../../components/Templates/TemplatesLeftSection";
import TemplatesRightSection from "../../components/Templates/TemplatesRightSection";
import { FaTimes } from "react-icons/fa";
import { faqWithLegalAgreementsArray } from "../../constants/global";
import { fetchTemplates } from "../../services/template-services";
import { useDispatch } from "react-redux";
import { setTemplate } from "../../redux/reducers/template-reducer";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const dispatch = useDispatch();
  const [searchClicked, setSearchCLicked] = React.useState(false);
  const [templates, setTemplates] = React.useState(faqWithLegalAgreementsArray);
  const [apiTemplates, setApiTemplates] = React.useState([] || null);
  const [searchTemplates, setSearchTemplates] = React.useState(apiTemplates);
  const [viewingtemplates, setViewingTemplates] = React.useState();
  const [subtypes, setSubtypes] = React.useState(null);
  const [selectedSubtype, setSelectedSubtype] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState("cat"); // Track if filtering by category or subcategory
  const [previewTemplate, setPreviewTemplate] = React.useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const templatess = async () => {
      const templates = await fetchTemplates(setLoading);
      console.log("templates", templates);
      setApiTemplates(templates.data);
      setViewingTemplates(templates.data);
    };
    templatess();
  }, []);
  const searchTemplate = (text) => {
    const filteredTemplates = apiTemplates.filter((template) => {
      const searchText = text.toLowerCase();
      const titleMatch = template.name.toLowerCase().includes(searchText);
      const categoryMatch = template.category.name
        .toLowerCase()
        .includes(searchText);
      const subCategoryMatch = template.sub_category.name
        .toLowerCase()
        .includes(searchText);
      const questionMatch = template.questions.some((faqItem) =>
        faqItem.question.toLowerCase().includes(searchText)
      );

      return titleMatch || categoryMatch || subCategoryMatch || questionMatch;
    });

    setSearchTemplates(filteredTemplates);
  };

  const groupedTemplates = React.useMemo(() => {
    if (selectedFilter === "cat") {
      return apiTemplates.reduce((acc, template) => {
        const { category } = template;
        if (!acc[category.name]) {
          acc[category.name] = [];
        }
        acc[category.name].push(template);
        return acc;
      }, {});
    } else if (selectedFilter === "subCat") {
      return apiTemplates.reduce((acc, template) => {
        const { sub_category } = template;
        if (!acc[sub_category.name]) {
          acc[sub_category.name] = [];
        }
        acc[sub_category.name].push(template);
        return acc;
      }, {});
    }
  }, [apiTemplates, selectedFilter]);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedFilter(value);
  };

  // Handle category or subcategory filter change
  // const handleFilterChange = (event) => {
  //   const value = event.target.value;
  //   setSelectedFilter(value);
  //   if (value === "cat") {
  //     setViewingTemplates(apiTemplates);
  //   } else if (value === "subCat") {
  //     const subCategoriesTemplates = apiTemplates.filter(
  //       (template) => template.sub_categories.length > 0
  //     );
  //     setViewingTemplates(subCategoriesTemplates);
  //   }
  // };
  return (
    <div className="dark:bg-black bg-white w-full flex flex-col items-center  pt-32 px-8 relative py-12">
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between">
        <div className=" flex flex-col items-start md:w-4/12">
          <h1 className="w-full dark:text-white items-center md:text-start text-center text-slate-900 text-title-xl2 font-bold">
            Templates
          </h1>
          <p className="w-full md:mt-0 mt-4 dark:text-zinc-400">
            Select a ready-to-use template
          </p>
        </div>
        <div
          className={`w-full flex flex-col-reverse md:flex-row items-center justify-between md:p-2`}
        >
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="mt-2 md:mt-0  p-2 border border-gray-300 rounded-md w-full md:w-[300px]"
          >
            <option value="cat">Search By Categories</option>
            <option value="subCat">Search By Sub Categories</option>
          </select>

          <div
            onClick={() => setSearchCLicked(true)}
            className="w-full md:w-[300px] flex flex-row items-center   border border-gray-300 p-2 rounded-md px-4 cursor-pointer"
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
                  {searchTemplates.map((template, index) => (
                    <div
                      key={template.id}
                      className="mt-2 rounded-lg w-full p-2 flex flex-col items-center border border-gray-200 cursor-pointer hover:border-white hover:text-white hover:bg-gray-700 transition-all duration-300"
                    >
                      <h2 className="text-md font-bold">{template.name}</h2>
                      <p className=" line-clamp-5 text-sm">
                        {template.content}
                      </p>
                      <div className="flex flex-col md:flex-row items-center justify-center w-full">
                        <button
                          className="mb-2 md:mb-0 md:mr-2 bg-black text-white px-4 py-2 rounded-md  min-w-40 flex flex-col items-center"
                          onClick={() => {
                            dispatch(setTemplate(template));
                            navigate("/templates/edit-template");
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setPreviewTemplate({
                              template: template,
                              index: index,
                            });
                          }}
                          className=" md:ml-2 bg-white text-black border border-black px-4 py-2 rounded-md  min-w-40"
                        >
                          Preview
                        </button>
                      </div>
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
            setSubtypes={setSubtypes}
            allTemplates={apiTemplates}
            templates={groupedTemplates}
            setViewingTemplates={setViewingTemplates}
          />
          {viewingtemplates && viewingtemplates.length > 0 && (
            <TemplatesRightSection
              templates={viewingtemplates}
              previewTemplate={previewTemplate}
              setPreviewTemplate={setPreviewTemplate}
            />
          )}
        </div>
      )}
      {apiTemplates && apiTemplates.length < 1 && (
        <div className="w-full flex flex-col items-center my-12">
          <h1 className="text-center ">No Templates to show</h1>
        </div>
      )}
    </div>
  );
};

export default Templates;
