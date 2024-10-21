import React, { useState, useEffect } from "react";
import {
  fetchUserDocuments,
  uploadDocument,
} from "../../services/document-services";
import VerifyDocumentPage from "../Document/VerifyDocument";

// Function to convert Google Drive link for preview
function convertToPreviewLink(driveLink) {
  // Check if the link contains '/view'
  if (driveLink.includes("/view")) {
    return driveLink.replace("/view", "/preview?usp=sharing");
  }
  return driveLink; // Return the original link if it doesn't contain '/view'
}

const UserDocument = () => {
  const [documentToUpload, setDocumentToUpload] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("title"); // For sorting
  const [documents, setDocuments] = useState([]); // For sorting
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetchUserDocuments(setLoading);
      setDocuments(response.data.results);
    };
    fetchDocuments();
  }, []);

  // Filter documents based on search term and verification status
  let filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      (verificationStatus === "verified" &&
        doc.verification_status === "Verified") ||
      (verificationStatus === "unverified" &&
        doc.verification_status === "Rejected" &&
        doc.verification_status !== "Pending") ||
      (verificationStatus === "pending" &&
        doc.verification_status === "Pending") ||
      (verificationStatus === "not-uploaded" && !doc.pdf_url);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dark:bg-black flex flex-col items-center w-full py-32 px-8">
      <h1 className="dark:text-white text-2xl font-bold mb-4">
        User Documents
      </h1>

      {/* Search and Filter */}
      <div className="mb-4 w-full flex flex-col sm:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full sm:w-4/12 lg:w-3/12"
        />

        {/* Status Dropdown */}
        <select
          value={verificationStatus}
          onChange={(e) => setVerificationStatus(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mt-4 sm:mt-0 sm:w-3/12"
        >
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
          <option value="pending">Pending Verification</option>
          <option value="not-uploaded">Not Uploaded yet</option>
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mt-4 sm:mt-0 sm:w-4/12 lg:w-3/12"
        >
          <option value="title">Sort by Title</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {loading && <p className="text-center py-10">Loading documents...</p>}

      {/* Document List */}
      {documents && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="dark:border-none dark:bg-slate-900 border p-4 rounded shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between">
                  <h2 className="dark:text-white font-semibold">{doc.title}</h2>
                  {/* Verification Badge */}
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      doc.verification_status === "Not Specified"
                        ? "bg-yellow-200 text-yellow-700"
                        : doc.verification_status === "Pending"
                        ? "bg-slate-300 text-slate-900"
                        : doc.verification_status === "Approved"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {doc.verification_status === "Not Specified"
                      ? "Not Uploaded yet"
                      : doc.verification_status}
                  </span>
                </div>
                {doc.pdf_url ? (
                  <>
                    <iframe
                      src={convertToPreviewLink(doc.pdf_url)}
                      title={doc.title}
                      className="my-2 w-full h-[300px] sm:h-[400px] lg:h-[500px] transition-all"
                      style={{ overflow: "hidden" }}
                    />
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      Download PDF
                    </a>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setDocumentToUpload(doc);
                      setIsModalOpen(true); // Open the modal on upload button click
                    }}
                    className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
                  >
                    Upload Document
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No documents found.</p>
          )}
        </div>
      )}

      {/* Full-Screen Modal for Document Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-xl max-h-[90vh] bg-white p-8  shadow-lg w-full sm:w-11/12 overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)} // Close the modal
              className="   text-graydark hover:text-gray-800"
            >
              &#x2715; {/* Close icon (X) */}
            </button>
            <VerifyDocumentPage id={documentToUpload.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDocument;
