import React from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { setTemplate } from "../../redux/reducers/template-reducer";
import { useDispatch } from "react-redux";
const TemplatesRightSection = ({ templates,previewTemplate,setPreviewTemplate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (previewTemplate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [previewTemplate]);
  const getUpdatedTemplateContent = () => {
    if (!previewTemplate) return ""; // Add this guard to avoid errors
    let content = previewTemplate.template.content;

    // If you want to replace placeholders, you can do it here
    // previewTemplate.template.questions.forEach((question, index) => {
    //   const answer = "_____"; // Or provide dynamic answers
    //   content = content.replace(question.placeholderId, answer);
    // });

    return content;
  };
  return (
    <div className="col-span-8 md:col-span-6 grid grid-cols-1 md:grid-cols-2 w-full gap-6 mt-8 md:mt-0 ">
      {templates.map((template, index) => (
        <div
          key={index}
          className="group hover:bg-white relative p-4 rounded-xl flex flex-col items-start w-full border border-gray-200 hover:border-black duration-300 transition-all"
        >
          {previewTemplate && previewTemplate.index === index && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
              <div className="bg-white w-11/12 md:w-8/12 p-6 rounded-lg relative max-h-[80vh] overflow-hidden">
                <div className="w-full flex justify-end">
                  <FaTimes
                    className="cursor-pointer text-xl mb-4"
                    onClick={() => setPreviewTemplate(null)}
                  />
                </div>
                <div
                  className=" overflow-y-auto max-h-[80vh]"
                  dangerouslySetInnerHTML={{
                    __html: getUpdatedTemplateContent(),
                  }}
                />
              </div>
            </div>
          )}

          <div className="hidden md:absolute inset-0 bg-black opacity-0 md:hover:opacity-50 transition-opacity duration-300 z-10"></div>

          <h3 className="p-1 bg-slate-300 border-black rounded-full text-black px-2 mb-4 z-20">
            {template.category.name}
          </h3>

          {/* Image */}
          <div className="w-full flex flex-col items-center z-20">
            <img
              src="/thumbnail4.png"
              className="w-full h-auto object-cover opacity-35"
            />
          </div>

          {/* Title and Ending Text */}
          <h1 className="text-lg font-bold mt-4 z-20">{template.name}</h1>

          <button
            className="md:hidden bg-black text-white px-4 py-2 rounded-md mt-4 min-w-40 flex flex-col items-center"
            onClick={() => {
              dispatch(setTemplate(template));
              navigate("/templates/edit-template");
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setPreviewTemplate({ template: template, index: index });
            }}
            className="md:hidden bg-white text-black border border-black px-4 py-2 rounded-md mt-4 min-w-40"
          >
            Preview
          </button>
          <div className="p-4 hidden md:flex flex-col items-center justify-center rounded-xl border h-full w-full left-0 top-0 bg-white absolute z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-lg font-bold mt-4 z-20 text-center">
              {template.title}
            </h1>
            <p className="z-20 text-center">{template.endingText}</p>

            <button
              className="bg-black text-white px-4 py-2 rounded-md mt-4 min-w-40 flex flex-col items-center"
              onClick={() => {
                dispatch(setTemplate(template));
                navigate("/templates/edit-template");
              }}
            >
              Edit
            </button>
            <button
              onClick={() =>
                setPreviewTemplate({ template: template, index: index })
              }
              className="bg-white text-black border border-black px-4 py-2 rounded-md mt-4 min-w-40"
            >
              Preview
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplatesRightSection;
