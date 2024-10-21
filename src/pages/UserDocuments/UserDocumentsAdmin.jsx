import React, { useState, useEffect } from "react";
import {
  deleteUserDocument,
  fetchAllDocuments,
} from "../../services/document-services";
import { config } from "../../config/config";
import { FaEye, FaTrash } from "react-icons/fa"; // Importing icons for preview and delete
import { Toaster } from "react-hot-toast";
import { notify } from "../../utilities/toast";
import Loader from "../../components/Loader/Loader";

export const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  documentName,
  buttonLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="dark:bg-slate-950 bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-6">
          Are you sure you want to delete the Document{" "}
          <strong>{documentName}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:text-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {buttonLoading ? <Loader /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

function convertToPreviewLink(driveLink) {
  if (driveLink.includes("/view")) {
    return driveLink.replace("/view", "/preview?usp=sharing");
  }
  return driveLink;
}

const UserDocumentsAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("all");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [currentUrl, setCurrentUrl] = useState(
    `${config.SERVER_URL}/api/all-created-documents`
  );
  const [nextUrl, setNextUrl] = useState(null); // Pagination: store next URL
  const [prevUrl, setPrevUrl] = useState(null); // Pagination: store previous URL

  const [previewContent, setPreviewContent] = useState(""); // State for document content
  const [showPreview, setShowPreview] = useState(false); // State for toggling preview visibility

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetchAllDocuments(currentUrl, setLoading);
      setDocuments(response.data.results);
      setNextUrl(response.data.next); // Store next page URL
      setPrevUrl(response.data.previous); // Store previous page URL
    };
    fetchDocuments();
  }, [currentUrl]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control modal visibility
  const [documentToDelete, setDocumentToDelete] = useState(null); // Template to delete

  const handleDeleteTemplate = async () => {
    if (documentToDelete) {
      try {
        const response = await deleteUserDocument(
          documentToDelete.id,
          setButtonLoading
        );
        if (response.status == 204) {
          setDocuments(
            documents.filter((doc) => doc.id !== documentToDelete.id)
          );
          notify("Template deleted successfully!");
        } else {
          notify("Failed to delete the template. Please try again.", "error");
        }
      } catch (error) {
        console.error("Error deleting template:", error);
        notify("An error occurred while deleting the template.");
      }
      setDocumentToDelete(null); // Clear the selected template after deletion
      setIsDeleteModalOpen(false); // Close modal
    }
  };

  const openDeleteModal = (template) => {
    setDocumentToDelete(template);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDocumentToDelete(null); // Reset template when cancel is clicked
  };

  // Filter documents based on search term and verification status
  let filteredDocuments;
  if (documents) {
    filteredDocuments = documents.filter((doc) => {
      const matchesSearch = doc.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        verificationStatus === "all" ||
        (verificationStatus === "verified" &&
          doc.verification_status === "Verified") ||
        (verificationStatus === "unverified" &&
          doc.verification_status !== "Verified" &&
          doc.verification_status !== "Pending Verification") ||
        (verificationStatus === "pending" &&
          doc.verification_status === "Pending Verification");

      return matchesSearch && matchesStatus;
    });
  }

  return (
    <div className="dark:bg-black flex flex-col items-center w-full py-32 px-8 relative">
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
          <option value="all">All</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
          <option value="pending">Pending Verification</option>
        </select>
      </div>

      {loading && (
        <p className="text-center py-10 dark:text-white text-graydark">
          Loading documents...
        </p>
      )}

      {/* Document List as a Table */}
      {documents && !loading && (
        <>
          <table className="min-w-full bg-white dark:bg-slate-900 border border-gray-200">
            {filteredDocuments.length > 0 && (
              <thead>
                <tr className=" bg-gray-2 dark:bg-meta-4">
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Verification Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
            )}
            <tbody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-stroke dark:border-strokedark"
                  >
                    <td className="py-2 px-4  first-line: dark:text-white text-center">
                      {doc.title}
                    </td>
                    <td className="py-2 px-4  text-center">
                      <span
                        className={`w-70 px-2 py-1 text-sm rounded ${
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
                          ? "Not Uploaded"
                          : doc.verification_status}
                      </span>
                    </td>
                    <td className="py-2 px-4  text-center">
                      <button
                        onClick={() => {
                          if (doc.pdf_url) {
                            window.open(
                              convertToPreviewLink(doc.pdf_url),
                              "_blank"
                            );
                          } else {
                            setPreviewContent(doc.content); // Set document content to state
                            setShowPreview(true); // Show preview div
                          }
                        }}
                        className="text-blue-500 hover:underline"
                        title="Preview Document"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => openDeleteModal(doc)}
                        className="ml-4 text-red-500 hover:underline"
                        title="Delete Document"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentUrl(prevUrl)}
              disabled={!prevUrl}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentUrl(nextUrl)}
              disabled={!nextUrl}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Preview Section */}
      {showPreview && (
        <div className="w-full p-4 mt-4 dark:bg-slate-950 bg-white rounded-md">
          <div className="flex justify-end">
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => setShowPreview(false)}
            >
              Close Preview
            </button>
          </div>
          <h2 className="text-lg font-bold mb-2">Document Preview:</h2>
          <div className="whitespace-pre-wrap">{previewContent}</div>
        </div>
      )}

      <Toaster />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteTemplate}
        onCancel={closeDeleteModal}
        documentName={documentToDelete ? documentToDelete.title : ""}
        buttonLoading={buttonLoading}
      />
    </div>
  );
};

export default UserDocumentsAdmin;
