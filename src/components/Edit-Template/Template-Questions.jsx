import React from "react";
import { getUpdatedTemplateContent } from "../../pages/Edit-Template/Edit-Template";

const TemplateQuestions = ({ template, setFormData, formData }) => {
  const handleChange = (e, index) => {
    setFormData({
      ...formData,
      [`answer${index + 1}`]: e.target.value.toUpperCase(), // Update the corresponding answer
    });
  };

  return (
    <div className="w-full pr-4">
      <h1 className="text-2xl font-semibold mb-4">
        Fill the Form for Template: {template.title}
      </h1>

      {template?.question?.map((questionObj, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700">{questionObj.question}</label>
          <input
            type="text"
            onChange={(e) => handleChange(e, index)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      ))}
    </div>
  );
};

export default TemplateQuestions;
