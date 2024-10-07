import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "./CustomStyles.css"; // Import your custom styles
import { createNewTemplate } from "../../services/template-services";
import { notify } from "../../utilities/toast";
import { Toaster } from "react-hot-toast";

const AdminTemplatePage = () => {
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState(""); // Main content
  const [questions, setQuestions] = useState([]); // All questions
  const [newQuestion, setNewQuestion] = useState(""); // Temp new question
  const [templateType, setTemplateType] = useState(""); // Temp new question
  const [loading, setLoading] = useState(false); // Temp new question

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

    console.log({
      templateName,
      templateContent: cleanTemplateContent,
      questions: rowData,
      templateType,
    });
    const newTemplate = await createNewTemplate(
      {
        name: templateName,
        content: templateContent,
        question: questions,
        category: templateType,
      },
      setLoading
    );
    if (newTemplate.status == 201) {
      notify("Template Added Successfully", "success");
    }
    console.log("New Template", newTemplate);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">
        Admin: Create New Template
      </h1>

      {/* Template Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Template Name</label>
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md shadow-sm"
          placeholder="Enter template name"
        />
      </div>

      {/* Template Content with Quill */}
      <div className="mb-6 overflow-hidden">
        <label className="block text-gray-700">Template Content</label>
        <ReactQuill
          ref={quillRef}
          value={templateContent}
          onChange={setTemplateContent}
          style={{
            height: "300px",
          }}
          className="h-[200px] bg-white "
          modules={quillModules}
        />
        <p className="text-sm text-gray-500 mt-16">
          Use placeholders like <code>{"{__1__}"}</code> to link user input from
          questions.
        </p>
      </div>

      {/* Add Question */}
      <select
        value={templateType}
        onChange={(e) => setTemplateType(e.target.value)}
        className="my-2 rounded-md border border-gray-400 w-full p-2   bg-white text-gray-700 shadow-sm rounded-r-md"
      >
        <option value="">Select Type</option>
        <option value="law">Law</option>
        <option value="mutuallity">Mutuallity</option>
        <option value="power">Power</option>
      </select>
      <div className="mb-4">
        <label className="block text-gray-700">Add Question</label>
        <div className="flex mt-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="flex-grow  p-2 border rounded-l-md shadow-sm"
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
