// import React, { useState, useRef } from 'react';
// import ReactQuill from 'react-quill';
// import './CustomStyles.css'; // Import your custom styles

// const AdminTemplatePage = () => {
//   const [templateName, setTemplateName] = useState('');
//   const [templateContent, setTemplateContent] = useState(''); // Main content
//   const [questions, setQuestions] = useState([]); // All questions
//   const [newQuestion, setNewQuestion] = useState(''); // Temp new question

//   const quillRef = useRef(null); // Ref to access Quill editor

//   // Handle adding questions
//   const handleAddQuestion = () => {
//     if (newQuestion.trim()) {
//       const placeholderId = `__${questions.length + 1}__`;
//       setQuestions([...questions, { question: newQuestion, placeholderId }]);
//       setNewQuestion('');
//     }
//   };

//   // Handle adding placeholder into the content at the current cursor position
//   const handleAddPlaceholder = (placeholderId) => {
//     const editor = quillRef.current.getEditor();
//     const range = editor.getSelection(true);
//     editor.insertText(range.index, placeholderId); // Insert placeholder at cursor position
//   };

//   // Handle saving template and printing row data
//   const handleSaveTemplate = () => {
//     const cleanTemplateContent = templateContent
//       .replace(/<h2 class="ql-align-center">/g, '<h2 class="header2 center bold">')
//       .replace(/<strong>/g, '<span class="bold">') // Replace strong tags if needed
//       .replace(/<\/strong>/g, '</span>') // Closing strong tag
//       .replace(/<ol[^>]*>/g, '<ul>') // Convert ordered lists to unordered lists
//       .replace(/<\/ol>/g, '</ul>') // Close unordered list tag
//       .replace(/<li[^>]*>/g, '<li>') // Clean list item tags
//       .replace(/<br\s*\/?>/g, '\n'); // Convert breaks to new lines

//     const rowData = questions.map(({ question, placeholderId }) => ({
//       question,
//       placeholderId,
//     }));

//     console.log({
//       templateName,
//       templateContent: cleanTemplateContent,
//       questions: rowData,
//     });
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
//       <h1 className="text-2xl font-semibold mb-4">Admin: Create New Template</h1>

//       {/* Template Name */}
//       <div className="mb-4">
//         <label className="block text-gray-700">Template Name</label>
//         <input
//           type="text"
//           value={templateName}
//           onChange={(e) => setTemplateName(e.target.value)}
//           className="w-full mt-1 p-2 border rounded-md shadow-sm"
//           placeholder="Enter template name"
//         />
//       </div>

//       {/* Template Content with Quill */}
//       <div className="mb-6">
//         <label className="block text-gray-700">Template Content</label>
//         <ReactQuill
//           ref={quillRef}
//           value={templateContent}
//           onChange={setTemplateContent}
//           className="h-48 bg-white"
//           modules={quillModules}
//         />
//         <p className="text-sm text-gray-500 mt-2">
//           Use placeholders like <code>{'{__1__}'}</code> to link user input from questions.
//         </p>
//       </div>

//       {/* Add Question */}
//       <div className="mb-4">
//         <label className="block text-gray-700">Add Question</label>
//         <div className="flex">
//           <input
//             type="text"
//             value={newQuestion}
//             onChange={(e) => setNewQuestion(e.target.value)}
//             className="flex-grow mt-1 p-2 border rounded-l-md shadow-sm"
//             placeholder="Enter a question"
//           />
//           <button
//             type="button"
//             onClick={handleAddQuestion}
//             className="p-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600"
//           >
//             Add Question
//           </button>
//         </div>
//       </div>

//       {/* Questions List with Add Placeholder */}
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold mb-2">Questions</h3>
//         <ul className="list-disc list-inside">
//           {questions.map((questionObj, index) => (
//             <li key={index} className="flex items-center text-gray-700 mb-2">
//               {questionObj.question}
//               <button
//                 type="button"
//                 onClick={() => handleAddPlaceholder(questionObj.placeholderId)}
//                 className="ml-4 px-2 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
//               >
//                 Insert Placeholder: {questionObj.placeholderId}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Save Template */}
//       <button
//         type="button"
//         onClick={handleSaveTemplate}
//         className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
//       >
//         Save Template
//       </button>
//     </div>
//   );
// };

// // Quill toolbar configuration
// const quillModules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['bold', 'italic', 'underline'],
//     ['link'],
//     [{ align: [] }],
//     [{ color: [] }, { background: [] }],
//     ['clean'],
//   ],
// };

// export default AdminTemplatePage;






import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import 'react-quill/dist/quill.snow.css';
import './CustomStyles.css';

const UserFormComponent = () => {
  const [formData, setFormData] = useState({});
  const [filledTemplate, setFilledTemplate] = useState('');

  // Define the template here
  const template = {
    templateName: "Residential Lease Agreement",
    templateContent: `<h2 class="header2 center bold"><span class="bold">Lease Agreement</span></h2><ul><li>My name is __1__</li><li>My age is __2__</li></ul>`,
    questions: [
      { question: "What is your name?", placeholderId: "__1__" },
      { question: "What is your age?", placeholderId: "__2__" },
    ],
  };

  useEffect(() => {
    let content = template.templateContent;
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      content = content.replace(new RegExp(key, 'g'), value);
    });
    setFilledTemplate(content);
  }, [formData, template.templateContent]);

  const handleChange = (e, placeholderId) => {
    setFormData({
      ...formData,
      [placeholderId]: e.target.value,
    });
  };

const downloadPDF = () => {
    const doc = new jsPDF();
    const margin = 15;
    const pageWidth = doc.internal.pageSize.width;

    // Set font and size
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Parse the filled template for elements
    const parseHTMLToPDF = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        let y = margin;

        Array.from(tempDiv.childNodes).forEach(node => {
            if (node.nodeName === 'H2') {
                doc.setFontSize(14);
                doc.text(node.textContent, margin, y, { align: 'center' }); // Centered text
                y += 10; // Space after header
                doc.setFontSize(12);
            } else if (node.nodeName === 'UL') {
                node.childNodes.forEach(li => {
                    doc.text(`• ${li.textContent}`, margin, y);
                    y += 8; // Space between list items
                });
            } else if (node.nodeName === 'P' || node.nodeName === 'DIV') {
                const textLines = doc.splitTextToSize(node.textContent, pageWidth - 2 * margin);
                textLines.forEach(line => {
                    doc.text(line, margin, y);
                    y += 8; // Space after paragraph
                });
            }

            // Handle text alignment
            if (node.classList && node.classList.contains('center')) {
                doc.text(node.textContent, margin, y, { align: 'center' });
                y += 8; // Adjust space after centered text
            }
        });

        return y; // Return the last y position for further use
    };

    // Parse filled template and add to PDF
    parseHTMLToPDF(filledTemplate);

    // Save the PDF
    doc.save('template-preview.pdf');
};


  return (
    <div className="max-w-4xl mt-32 mx-auto p-6 bg-white shadow-md rounded-lg flex">
      {/* Form section */}
      <div className="w-1/2 pr-4">
        <h1 className="text-2xl font-semibold mb-4">Fill the Form for Template: {template.templateName}</h1>

        {template.questions.map((questionObj, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">{questionObj.question}</label>
            <input
              type="text"
              onChange={(e) => handleChange(e, questionObj.placeholderId)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={downloadPDF}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* Preview section */}
      <div className="w-1/2 pl-4 overflow-y-scroll h-80">
        <h2 className="text-xl font-semibold mb-2">Real-time Template Preview:</h2>
        <div
          className="p-4 bg-gray-100 rounded-md border border-gray-300"
          style={{ fontSize: '12px', textAlign: 'justify' }}
          dangerouslySetInnerHTML={{ __html: filledTemplate }}
        />
      </div>
    </div>
  );
};

export default UserFormComponent;
