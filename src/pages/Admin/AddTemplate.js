import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "./CustomStyles.css"; // Import your custom styles
import {
  createNewTemplate,
  fetchCategories,
} from "../../services/template-services";
import { notify } from "../../utilities/toast";
import { Toaster } from "react-hot-toast";

const AdminTemplatePage = () => {
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState(""); // Main content
  const [questions, setQuestions] = useState([]); // All questions
  const [newQuestion, setNewQuestion] = useState(""); // Temp new question
  const [templateType, setTemplateType] = useState(""); // Temp new question
  const [templateSubType, setTemplateSubType] = useState(""); // Temp new question
  const [loading, setLoading] = useState(false); // Temp new question
  const [errors, setErrors] = useState({
    templateName: "",
    templateContent: "",
    templateType: "",
    templateSubType: "",
    questions: "",
  });
  const validateFields = () => {
    const newErrors = {};
    if (!templateName) newErrors.templateName = "Template name is required.";
    if (!templateContent)
      newErrors.templateContent = "Template content is required.";
    if (!templateType) newErrors.templateType = "Template type is required.";
    if (templateType && !templateSubType)
      newErrors.templateSubType = "Template subtype is required.";
    if (questions.length === 0)
      newErrors.questions = "At least one question is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const quillRef = useRef(null); // Ref to access Quill editor

  // Handle adding questions
  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      const placeholderId = `__${questions.length + 1}__`;
      setQuestions([...questions, { question: newQuestion, placeholderId }]);
      setNewQuestion("");
    }
  };

  // Handle adding placeholder into the content at the current cursor position
  const handleAddPlaceholder = (placeholderId) => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection(true);
    editor.insertText(range.index, placeholderId); // Insert placeholder at cursor position
  };

  // Handle saving template and printing row data
  const handleSaveTemplate = async () => {
    const cleanTemplateContent = templateContent
      .replace(
        /<h2 class="ql-align-center">/g,
        '<h2 class="header2 center bold">'
      )
      .replace(/<strong>/g, '<span class="bold">') // Replace strong tags if needed
      .replace(/<\/strong>/g, "</span>") // Closing strong tag
      .replace(/<ol[^>]*>/g, "<ol>") // Convert ordered lists to unordered lists
      .replace(/<\/ol>/g, "</ol>") // Close unordered list tag
      .replace(/<li[^>]*>/g, "<li>") // Clean list item tags
      .replace(/<br\s*\/?>/g, "\n"); // Convert breaks to new lines

    const rowData = questions.map(({ question, placeholderId }) => ({
      question,
      placeholderId,
    }));
    // if (!templateName) {
    //   notify("Add Template Name", "error");
    // } else if (!templateContent) {
    //   notify("Add some content to template", "error");
    // } else if (!templateType) {
    //   notify("Add Type to template", "error");
    // } else if (!templateSubType) {
    //   notify("Add Sub Type to template", "error");
    // } else if (!questions) {
    //   notify("Add Questions to template", "error");
    // } else {
    if (!validateFields()) return; // Stop if validation fails

    const newTemplate = await createNewTemplate(
      {
        name: templateName,
        content: templateContent,
        questions: questions,
        category: subCategories.id,
      },
      setLoading
    );
    if (newTemplate.status == 201) {
      notify("Template Added Successfully", "success");
      setTemplateName("");
      setTemplateContent(""); // Main content
      setQuestions([]); // All questions
      setNewQuestion(""); // Temp new question
      setTemplateType(""); // Temp new question
    }
    console.log("New Template", newTemplate);
    // }
  };
  const [fetchLoading, setFetchLoading] = useState(false); // Loading state

  useEffect(() => {
    const abc = async () => {
      const response = await fetchCategories(setFetchLoading);
      setCategories(response.data);
    };
    abc();
  }, []);
  return (
    <div className="container mx-auto p-6 dark:bg-black bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">
        Admin: Create New Template
      </h1>

      {/* Template Name */}
      <div className="mb-4">
        <label className="block dark:text-white text-slate-900">
          Template Name
        </label>
        <input
          type="text"
          value={templateName}
          onChange={(e) => {
            if (e.target.value != "") {
              setErrors({
                ...errors,
                templateName: "",
              });
            } else {
              setErrors({
                ...errors,
                templateName: "Required",
              });
            }
            setTemplateName(e.target.value);
          }}
          className="w-full mt-1 p-2  rounded-md shadow-sm text-black-2 focus:outline-none focus:ring-0"
          placeholder="Enter template name"
        />
        {errors.templateName && (
          <p className="text-red-500 text-xs">{errors.templateName}</p>
        )}
      </div>

      {/* Template Content with Quill */}
      <div className="mb-6 overflow-hidden">
        <label className="block dark:text-white text-gray-700">
          Template Content
        </label>
        <ReactQuill
          ref={quillRef}
          value={templateContent}
          onChange={setTemplateContent}
          style={{
            height: "300px",
          }}
          className="h-[200px] bg-white text-black-2 focus:outline-none focus:ring-0"
          modules={quillModules}
        />
        <p className="text-sm dark:text-zinc-400 text-gray-500 mt-16">
          Use placeholders like <code>{"{__1__}"}</code> to link user input from
          questions.
        </p>
        {errors.templateContent && (
          <p className="text-red-500 text-xs">{errors.templateContent}</p>
        )}
      </div>

      {/* Add Question */}
      <div className="mb-4">
        <label className="block dark:text-white text-gray-700">
          Template Type
        </label>
        <select
          value={templateType}
          onChange={(e) => {
            if (e.target.value != "") {
              setErrors({
                ...errors,
                templateType: "",
              });
            } else {
              setErrors({
                ...errors,
                templateType: "Required",
              });
            }
            setSubCategories(
              categories.find((cat) => {
                return cat.name == e.target.value;
              })
            );
            console.log(
              categories.find((cat) => {
                return cat.name == e.target.value;
              })
            );
            setTemplateType(e.target.value);
          }}
          className="focus:outline-none focus:ring-0 text-black-2 my-2 rounded-md  -gray-400 w-full p-2   bg-white text-gray-700 shadow-sm rounded-r-md"
        >
          <option value="">Select Type</option>
          {categories &&
            categories.map((cat) => (
              <option value={cat.name} className="first-letter:uppercase">
                {cat.name}
              </option>
            ))}
        </select>
        {errors.templateType && (
          <p className="text-red-500 text-xs">{errors.templateType}</p>
        )}
      </div>
      {templateType && subCategories && (
        <div className="mb-4">
          <label className="block dark:text-white text-gray-700">
            Template Sub Type
          </label>
          <select
            value={templateSubType}
            onChange={(e) => {
              if (e.target.value != "") {
                setErrors({
                  ...errors,
                  templateSubType: "",
                });
              } else {
                setErrors({
                  ...errors,
                  templateSubType: "Required",
                });
              }

              setTemplateSubType(e.target.value);
            }}
            className="focus:outline-none focus:ring-0 text-black-2 my-2 rounded-md  -gray-400 w-full p-2   bg-white text-gray-700 shadow-sm rounded-r-md"
          >
            <option value="">Select Sub Type</option>
            {subCategories.sub_categories.result.map((cat) => (
              <option value={cat}>{cat}</option>
            ))}
          </select>
          {errors.templateSubType && (
            <p className="text-red-500 text-xs">{errors.templateSubType}</p>
          )}
        </div>
      )}

      <div className="mb-4">
        <label className="block dark:text-white text-gray-700">
          Add Question
        </label>
        <div className="flex mt-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => {
              if (e.target.value != "") {
                setErrors({
                  ...errors,
                  questions: "",
                });
              } else {
                setErrors({
                  ...errors,
                  questions: "Required",
                });
              }
              setNewQuestion(e.target.value);
            }}
            className="text-black-2 flex-grow  p-2  rounded-l-md shadow-sm focus:outline-none focus:ring-0"
            placeholder="Enter a question"
          />
          <button
            type="button"
            onClick={handleAddQuestion}
            className=" p-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600"
          >
            Add Question
          </button>
        </div>
        <div className="mb-4">
          {errors.questions && (
            <p className="text-red-500 text-xs">{errors.questions}</p>
          )}
        </div>
      </div>

      {/* Questions List with Add Placeholder */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Questions</h3>
        <ul className="list-disc list-inside">
          {questions.map((questionObj, index) => (
            <li key={index} className="flex items-center text-gray-700 mb-2">
              {questionObj.question}
              <button
                type="button"
                onClick={() => handleAddPlaceholder(questionObj.placeholderId)}
                className="ml-4 px-2 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Insert Placeholder: {questionObj.placeholderId}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Save Template */}
      <button
        type="button"
        onClick={handleSaveTemplate}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
      >
        Save Template
      </button>
      <Toaster />
    </div>
  );
};

// Quill toolbar configuration
const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

export default AdminTemplatePage;
