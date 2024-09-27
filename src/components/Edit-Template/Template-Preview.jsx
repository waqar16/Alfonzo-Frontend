import React from "react";
import { getUpdatedTemplateContent } from "../../pages/Edit-Template/Edit-Template";
import "./Template-Preview.module.css";
const TemplatePreview = ({ templateAnswers, previewTemplate, pdfRef }) => {
  // Function to get the updated template content

  return (
    <div className="mt-8 md:mt-0 col-span-1 w-full md:pl-4">
      <h2 className="text-2xl font-semibold  ">Real-time PDF Preview:</h2>
      <div
        className="p-4 mt-4 md:mt-10 bg-white overflow-y-auto h-[300px]"
        ref={pdfRef}
      >
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold  text-black mb-2">
          {previewTemplate.title}
        </h1>
        <div
          className="text-black"
          dangerouslySetInnerHTML={{
            __html: getUpdatedTemplateContent(templateAnswers, previewTemplate),
          }}
        />
      </div>
    </div>
  );
};

export default TemplatePreview;
