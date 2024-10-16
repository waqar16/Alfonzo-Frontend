import React, { useEffect, useState } from "react";
import TemplateQuestions from "../../components/Edit-Template/Template-Questions";
import TemplatePreview from "../../components/Edit-Template/Template-Preview";
import { faqWithLegalAgreementsArray } from "../../constants/global";
import { jsPDF } from "jspdf";
import { NavLink, useNavigate } from "react-router-dom";
import { setDocument } from "../../redux/reducers/document-reducer";
import { useDispatch, useSelector } from "react-redux";

export const getUpdatedTemplateContent = (templateAnswers, previewTemplate) => {
  let content = previewTemplate.content;

  // Replace placeholders with either the answer or "_____"
  previewTemplate?.questions?.forEach((question, index) => {
    const answer = templateAnswers[`answer${index + 1}`]
      ? `<strong >${templateAnswers[`answer${index + 1}`]}</strong>` // Make the answer bold
      : `<span className="text-red-400">_____</span>`; // Default to "_____"

    // Replace the placeholder with the bolded answer
    content = content.replace(question?.placeholderId, answer);
  });

  return content;
};

const EditTemplate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const template = useSelector((state) => state.selectedTemplate);

  const pdfRef = React.useRef();

  // const template = faqWithLegalAgreementsArray[1];
  const [formData, setFormData] = useState(
    template?.questions?.reduce((acc, _, index) => {
      acc[`answer${index + 1}`] = ""; // Initialize with empty string
      return acc;
    }, {})
  );
  const [isNull, setIsNull] = useState(true);

  useEffect(() => {
    if (formData) {
      setIsNull(Object.values(formData).some((value) => value === ""));
    }
    console.log("second");
  }, [formData]);
  console.log(template);
  return (
    <div className="flex flex-col items-start w-full pt-32 px-4 md:px-12 py-12">
      {!template?.questions ? (
        <div className="flex flex-col items-center w-full  ">
          <h2>No Template Selected.</h2>
          <NavLink
            to={"/templates"}
            className={`mt-4 px-4 py-2  bg-gray-600 text-white font-semibold rounded-md
 `}
          >
            Select Template
          </NavLink>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 w-full">
            <TemplateQuestions
              template={template}
              setFormData={setFormData}
              formData={formData}
            />
            <TemplatePreview
              pdfRef={pdfRef}
              previewTemplate={template}
              templateAnswers={formData}
            />
          </div>
          <div className="flex flex-row items-center">
            <NavLink
              to={"/templates/lawyer"}
              className={`mt-4 px-4 py-2 ${
                isNull ? "bg-gray-600" : "bg-blue-600"
              } text-white font-semibold rounded-md
    ${!isNull && "hover:bg-blue-700"}`}
              onClick={(e) => {
                if (isNull) {
                  e.preventDefault();
                } else {
                  let content = getUpdatedTemplateContent(formData, template);

                  dispatch(setDocument({ content, template }));
                }
              }}
            >
              Next
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default EditTemplate;
