import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCheckCircle, faTimesCircle, faEye, faAdd } from '@fortawesome/free-solid-svg-icons';

const VerifyDocumentPage = () => {
  const [document, setDocument] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [statusDetails, setStatusDetails] = useState('');
  const fileInputRef = useRef(null);
  
    const handleDocumentSelect = () => {
      fileInputRef.current.click();
      setDocument({ name: 'Sample Document.pdf' });
      setVerificationStatus('pending');
      setStatusDetails('Document is pending verification.');
    };

    
   // Function to handle document upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocument(file);
      // Simulate document verification
      setTimeout(() => {
        // Simulate verification result
        setVerificationStatus('verified'); // Options: 'verified', 'pending', 'rejected'
        setStatusDetails('Document has been verified successfully.');
      }, 2000); // Simulate a delay for verification
    }
  };



  return (
    <section className="min-h-screen flex items-center py-8 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-100 ">  
      <div className="max-w-7xl w-full mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Verify Document</h1>
          
          {/* Document Upload or Selection */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDocumentSelect}
                className="bg-blue-600 text-white sm:w-80 px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition-all duration-200 flex items-center"
              >
                <FontAwesomeIcon icon={faAdd} className="mr-2" />
                Select Document
              </button>
              <input
                type="file"
                id="uploadDocument"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Display Document Information */}
          {document && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Uploaded Document:</h2>
              <p className="text-gray-800">{document.name || 'No document selected.'}</p>
            </div>
          )}

          {/* Verification Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Verification Status</h2>
            {verificationStatus === 'verified' && (
              <div className="flex items-center space-x-2 text-green-600">
                <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />
                <p>{statusDetails}</p>
              </div>
            )}
            {verificationStatus === 'rejected' && (
              <div className="flex items-center space-x-2 text-red-600">
                <FontAwesomeIcon icon={faTimesCircle} className="text-2xl" />
                <p>{statusDetails}</p>
              </div>
            )}
            {verificationStatus === 'pending' && (
              <div className="flex items-center space-x-2 text-yellow-600">
                <FontAwesomeIcon icon={faUpload} className="text-2xl" />
                <p>{statusDetails}</p>
              </div>
            )}
            {!verificationStatus && (
              <p className="text-gray-600">No document selected or verification not started.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyDocumentPage;
