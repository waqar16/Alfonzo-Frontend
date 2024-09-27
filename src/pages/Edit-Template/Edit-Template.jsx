import React, { useEffect, useState } from "react";
import TemplateQuestions from "../../components/Edit-Template/Template-Questions";
import TemplatePreview from "../../components/Edit-Template/Template-Preview";
import { faqWithLegalAgreementsArray } from "../../constants/global";
import { jsPDF } from "jspdf";
import { NavLink } from "react-router-dom";
import { setDocument } from "../../redux/reducers/document-reducer";
import { useDispatch } from "react-redux";

export const getUpdatedTemplateContent = (templateAnswers, previewTemplate) => {
  let content = previewTemplate.templateContent;

  // Replace placeholders with either the answer or "_____"
  previewTemplate.questions.forEach((question, index) => {
    const answer =
      templateAnswers[`answer${index + 1}`] ||
      `<span className="text-red-400">_____</span>`; // Default to "_____"
    content = content.replace(question.placeholderId, answer); // Replace the placeholder with the answer
  });

  return content;
};

const EditTemplate = () => {
  const dispatch = useDispatch();
  const pdfRef = React.useRef();

  const template = faqWithLegalAgreementsArray[1];
  const [formData, setFormData] = useState(
    template.questions.reduce((acc, _, index) => {
      acc[`answer${index + 1}`] = ""; // Initialize with empty string
      return acc;
    }, {})
  );

  const [isNull, setIsNull] = useState(true);

  useEffect(() => {
    setIsNull(Object.values(formData).some((value) => value === ""));
  }, [formData]);

  return (
    <div className="flex flex-col items-start w-full mt-32 px-4 md:px-12 my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 w-full">
        <TemplateQuestions
          template={template}
          setFormData={setFormData}
          formData={formData}
          // generatePDF={generatePDF}
        />
        <TemplatePreview
          pdfRef={pdfRef}
          previewTemplate={template}
          templateAnswers={formData}
        />
      </div>
      <div className="flex flex-row items-center">
        {/* <button
          type="button"
          onClick={() => {
            // generatePDF();
            console.log(getUpdatedTemplateContent(formData, template));
          }}
          disabled={isNull}
          className={`mt-4 px-4 py-2 ${
            isNull ? "bg-gray-600" : "bg-blue-600"
          } text-white font-semibold rounded-md
        ${!isNull && "hover:bg-blue-700"}`}
        >
          Next
        </button> */}
        <NavLink
          to={"/templates/lawyer"}
          className={`mt-4 px-4 py-2 ${
            isNull ? "bg-gray-600" : "bg-blue-600"
          } text-white font-semibold rounded-md
        ${!isNull && "hover:bg-blue-700"}`}
          onClick={(e) => {
            if (isNull) {
              e.preventDefault(); // Prevent navigation if disabled
            } else {
              let content = getUpdatedTemplateContent(formData, template);

              dispatch(setDocument({ content, template }));
            }
          }}
        >
          Next
        </NavLink>
        {/* <button
          type="button"
          onClick={() => {
            generatePDF();
            console.log(getUpdatedTemplateContent(formData, template));
          }}
          className={` mt-4 px-4 py-2  text-white font-semibold rounded-md hover:bg-blue-700`}
        >
          Download PDF
        </button> */}
      </div>
    </div>
  );
};

export default EditTemplate;
