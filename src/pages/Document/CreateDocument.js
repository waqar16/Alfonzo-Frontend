import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faSave, faUser } from '@fortawesome/free-solid-svg-icons';

const CreateDocumentPage = () => {
  const [documentType, setDocumentType] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [preferredLawyer, setPreferredLawyer] = useState('');
  const [templatePreview, setTemplatePreview] = useState('');

  // Simulate fetching document template and questions
  useEffect(() => {
    if (documentType) {
      // Sample questions based on document type
      const dummyQuestions = {
        contract: [
          { id: '1', text: 'Contract Title' },
          { id: '2', text: 'Contract Date' },
          { id: '3', text: 'Parties Involved' },
          { id: '4', text: 'Contract Details' },
        ],
        invoice: [
          { id: '1', text: 'Invoice Number' },
          { id: '2', text: 'Invoice Date' },
          { id: '3', text: 'Client Name' },
          { id: '4', text: 'Amount Due' },
          { id: '5', text: 'Due Date' },
        ],
        agreement: [
          { id: '1', text: 'Agreement Title' },
          { id: '2', text: 'Effective Date' },
          { id: '3', text: 'Parties Involved' },
          { id: '4', text: 'Agreement Terms' },
          { id: '5', text: 'Signatures' },
        ],
        nda: [
          { id: '1', text: 'NDA Title' },
          { id: '2', text: 'Effective Date' },
          { id: '3', text: 'Disclosing Party' },
          { id: '4', text: 'Receiving Party' },
          { id: '5', text: 'Confidentiality Terms' },
        ],
      };

      setQuestions(dummyQuestions[documentType] || []);
    }
  }, [documentType]);

  // Autosave functionality
  useEffect(() => {
    const saveData = () => {
      localStorage.setItem('documentAnswers', JSON.stringify(answers));
    };
    saveData();
  }, [answers]);

  // Real-time preview update
  useEffect(() => {
    const generatePreview = () => {
      let preview = '';
      questions.forEach(question => {
        preview += `${question.text}: ${answers[question.id] || 'Not answered'}\n`;
      });
      setTemplatePreview(preview);
    };
    generatePreview();
  }, [answers, questions]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value
    }));
  };

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  const handleSave = () => {
    // Save document logic
    alert('Document saved!');
  };

  const handleSubmit = () => {
    // Submit document for review
    alert('Document submitted for review!');
  };

  return (
    <section className="p-6" style={{ marginTop: '30px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Create New Document</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <div>
              <div className="mb-6">
                <label htmlFor="documentType" className="block text-gray-700 mb-2">Select Document Type:</label>
                <select
                  id="documentType"
                  value={documentType}
                  onChange={handleDocumentTypeChange}
                  className="form-select w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                >
                  <option value="">Select...</option>
                  <option value="contract">Contract</option>
                  <option value="invoice">Invoice</option>
                  <option value="agreement">Agreement</option>
                  <option value="nda">NDA (Non-Disclosure Agreement)</option>
                </select>
              </div>

              {/* Render questions dynamically */}
              {questions.map((question) => (
                <div key={question.id} className="mb-4">
                  <label htmlFor={question.id} className="block text-gray-700 mb-2">{question.text}</label>
                  <input
                    type="text"
                    id={question.id}
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                  />
                </div>
              ))}

              {/* Preferred Lawyer Section */}
              <div className="mb-6">
                <label htmlFor="preferredLawyer" className="block text-gray-700 mb-2">Select Preferred Lawyer:</label>
                <input
                  type="text"
                  id="preferredLawyer"
                  value={preferredLawyer}
                  onChange={(e) => setPreferredLawyer(e.target.value)}
                  className="form-input w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                />
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Template Preview</h2>
              <pre className="border border-gray-300 p-4 rounded-lg whitespace-pre-wrap bg-white text-gray-900">
                {templatePreview || 'Preview will be updated as you answer questions.'}
              </pre>
            </div>
          </div>

          {/* Save and Submit Buttons */}
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition-all duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={faFile} className="mr-2" />
              Submit for Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateDocumentPage;
