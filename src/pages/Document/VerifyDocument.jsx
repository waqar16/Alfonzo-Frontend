import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.module.css";
import {
  faUpload,
  faCheckCircle,
  faTimesCircle,
  faEye,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  updateDocument,
  uploadDocument,
} from "../../services/document-services";

const VerifyDocumentPage = ({ id }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [document, setDocument] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [statusDetails, setStatusDetails] = useState("");
  const [filePreviewUrl, setFilePreviewUrl] = useState(null); // State for PDF preview
  const fileInputRef = useRef(null);

  const handleDocumentSelect = () => {
    fileInputRef.current.click();
  };

  // Function to handle document upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocument(file);
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        console.log(fileReader.result);
        setFilePreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };
  console.log("id", id);
  return (
    <section className="w-full dark:bg-black bg-white flex items-start justify-center py-4   px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl w-full mx-auto">
        <div className=" dark:bg-slate-900 p-6 rounded-lg shadow-md border dark:border-none border-gray-200  ">
          <h1 className="text-2xl font-bold dark:text-white text-gray-900 mb-1">
            Verify Document
          </h1>
          <p className=" mb-4">Upload your downloaded template pdf here.</p>
          {/* Document Upload or Selection */}
          <div className="mb-2">
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
                accept=".pdf" // Restrict to PDF files
              />
            </div>
          </div>

          {/* Display Document Information */}
          {document && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Uploaded Document:
              </h2>
              {filePreviewUrl && (
                <div className="mb-8 w-full h-auto">
                  <iframe
                    src={filePreviewUrl}
                    title="PDF Preview"
                    className="w-full h-[60vh] sm:h-[75vh] lg:h-[80vh] border"
                  />
                </div>
              )}
            </div>
          )}

          {filePreviewUrl && (
            <button
              onClick={async () => {
                setLoading(true);
                // setTimeout(() => {
                //   notify();
                //   setLoading(false);
                // }, 3000);
                // setTimeout(() => {
                //   navigate("/");
                // }, 4000);
                const response = await uploadDocument(document, setLoading);
                if (response.status == 200) {
                  let response2 = await updateDocument(
                    {
                      pdf_url: response.data.file_url,
                      id,
                      verification_status: "Pending",
                    },
                    setLoading
                  );
                  if (response2.status == 200) {
                    navigate("/your-documents");
                  }
                  console.log(response2);
                }
                console.log(response);
              }}
              className="bg-blue-600 text-white sm:w-80 px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition-all duration-200 flex items-center"
            >
              {loading ? (
                <Loader size={"20"} />
              ) : (
                <>
                  <FontAwesomeIcon icon={faUpload} className="mr-2" />
                  Publish Document
                </>
              )}
            </button>
          )}
          <Toaster />
        </div>
      </div>
    </section>
  );
};

export default VerifyDocumentPage;
