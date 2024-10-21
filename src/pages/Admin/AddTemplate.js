import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "./CustomStyles.css"; // Import your custom styles
import {
  createNewTemplate,
  fetchCategories,
} from "../../services/template-services";
import { notify } from "../../utilities/toast";
import { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

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
  const [showPreview, setShowPreview] = useState(false); // Control preview visibility

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

    // Get the text around the cursor

    const textAfter = editor.getText(range.index, 1);
    const textBefore = editor.getText(range.index - 1, 1);
    // Add whitespace before if there's no space
    if (textBefore && !/\s/.test(textBefore)) {
      editor.insertText(range.index, " ");
    }

    // Insert the placeholder
    editor.insertText(range.index, placeholderId);

    // Add whitespace after if there's no space
    if (textAfter && !/\s/.test(textAfter)) {
      editor.insertText(range.index + placeholderId.length, " ");
    }
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
      .replace(/<br\s*\/?>/g, "\n") // Convert breaks to new lines
      .replace(/(__\d+__)(\S)/g, "$1 $2") // Add space after the placeholder if there's none
      .replace(/(\S)(__\d+__)/g, "$1 $2"); // Add space before the placeholder if there's none

    const rowData = questions.map(({ question, placeholderId }) => ({
      question,
      placeholderId,
    }));
    console.log("templateContent", templateContent);
    console.log("rowData", rowData);
    console.log("cleanTemplateContent", cleanTemplateContent);
    if (!validateFields()) return; // Stop if validation fails

    const newTemplate = await createNewTemplate(
      {
        name: templateName,
        content: cleanTemplateContent,
        questions: questions,
        category: templateType.id,
        sub_category: templateSubType.id,
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
      {categories && (
        <div className="mb-4">
          <label className="block dark:text-white text-gray-700">
            Template Type
          </label>
          {categories.length > 0 ? (
            <select
              value={templateType.name}
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
                setTemplateType(
                  categories.find((cat) => {
                    return cat.name == e.target.value;
                  })
                );
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
          ) : (
            <p>
              No Categories to show add some categories{" "}
              <NavLink
                to={"/admin/add-category"}
                className={"dark:text-white underline text-blue-700"}
              >
                here
              </NavLink>
            </p>
          )}
          {errors.templateType && (
            <p className="text-red-500 text-xs">{errors.templateType}</p>
          )}
        </div>
      )}
      {templateType && subCategories && (
        <div className="mb-4">
          <label className="block dark:text-white text-gray-700">
            Template Sub Type
          </label>
          <select
            value={templateSubType.name}
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

              setTemplateSubType(
                templateType.sub_categories.find((s) => {
                  return s.name == e.target.value;
                })
              );
            }}
            className="focus:outline-none focus:ring-0 text-black-2 my-2 rounded-md  -gray-400 w-full p-2   bg-white text-gray-700 shadow-sm rounded-r-md"
          >
            <option value="">Select Sub Type</option>
            {subCategories.sub_categories.map((cat) => (
              <option value={cat.name}>{cat.name}</option>
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
            <li
              key={index}
              className="flex items-center dark:text-zinc-400 text-gray-700 mb-2"
            >
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
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="mb-4 p-2 dark:bg-slate-900 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center"
      >
        <FontAwesomeIcon icon={showPreview ? faEyeSlash : faEye} />
        <span className="ml-2">
          {showPreview ? "Hide Preview" : "Show Preview"}
        </span>
      </button>

      {/* Live Preview */}
      {showPreview && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
          <div
            className="preview bg-white p-4 border rounded-md shadow-sm"
            dangerouslySetInnerHTML={{ __html: templateContent }}
          />
        </div>
      )}
      {/* Save Template */}
      <button
        type="button"
        onClick={handleSaveTemplate}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 w-[200px]"
      >
        {loading ? <Loader /> : "Save Template"}
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
