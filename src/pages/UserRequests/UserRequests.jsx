import React, { useState, useEffect, act } from "react";
import {
  faCheckCircle,
  faTimes,
  faTimesCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchLawyerRelatedDocuments,
  updateDocumentStatusLawyer,
} from "../../services/document-services";
import { notify } from "../../utilities/toast";
import { Toaster } from "react-hot-toast";

// Sample data array
// const documents = [
//   {
//     id: 1,
//     title: "Document 1",
//     link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",
//     verified: true,
//     pending: false,
//     userImage: "https://randomuser.me/api/portraits/men/1.jpg", // Example image link
//     userName: "John Doe",
//     userEmail: "john.doe@example.com",
//     type: "Support",
//   },
//   {
//     id: 2,
//     title: "Document 2",
//     link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",
//     verified: false,
//     pending: true,
//     userImage: "https://randomuser.me/api/portraits/women/2.jpg", // Example image link
//     userName: "Jane Smith",
//     userEmail: "jane.smith@example.com",
//     type: "Purchases",
//   },
//   {
//     id: 3,
//     title: "Document 3",
//     link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",
//     verified: true,
//     pending: false,
//     userImage: "https://randomuser.me/api/portraits/men/3.jpg", // Example image link
//     userName: "Robert Brown",
//     userEmail: "robert.brown@example.com",
//     type: "Security",
//   },
//   {
//     id: 4,
//     title: "Document 4",
//     link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",
//     verified: false,
//     pending: false,
//     userImage: "https://randomuser.me/api/portraits/women/4.jpg", // Example image link
//     userName: "Emily Davis",
//     userEmail: "emily.davis@example.com",
//     type: "Security",
//   },
// ];
function convertToPreviewLink(driveLink) {
  console.log(driveLink);
  // Check if the link contains '/view'
  if (driveLink.includes("/view")) {
    // Replace '/view' with '/preview?usp=sharing'
    return driveLink.replace("/view", "/preview?usp=sharing");
  }
  return driveLink; // Return the original link if it doesn't contain '/view'
}
// Modal component for Document Preview
const Modal = ({ isOpen, onClose, document }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-10/12 h-5/6 relative overflow-hidden">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{document.title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <iframe
          src={convertToPreviewLink(document.pdf_url)}
          title={document.title}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, action }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-10/12">
        <div className="flex items-center mb-4">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-yellow-500 mr-2"
          />
          <h2 className="text-xl font-bold">Confirm {action}</h2>
        </div>
        <p>Are you sure you want to {action.toLowerCase()} this document?</p>
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 ${
              action == "Rejected" ? "bg-red-500" : "bg-green-500"
            } text-white
            ${action == "Rejected" ? "hover:bg-red-600" : "hover:bg-green-600"} 
            rounded `}
            onClick={() => {
              onConfirm(action);
              // onClose();
            }}
          >
            {action}
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

const UserRequests = () => {
  const [documents, setDocuments] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [documentType, setDocumentType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  // Function to handle opening the document preview modal
  const handleOpenModal = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  // Function to handle closing the document preview modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  // Function to handle opening the confirmation modal
  const handleOpenConfirmModal = (action, id) => {
    setCurrentAction(action);
    setDocumentId(id);
    setIsConfirmModalOpen(true);
  };

  // Function to handle closing the confirmation modal
  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setCurrentAction("");
  };

  // Function to handle confirming the action (Approved/Rejected)
  const handleConfirmAction = async (status) => {
    const response = await updateDocumentStatusLawyer(
      {
        id: documentId,
        verification_status: `${status}`,
      },
      setButtonLoading
    );
    if (response.status == 200) {
      notify(
        `Verification Status updated to ${response.data.verification_status.toLowerCase()}`,
        "success"
      );
      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.id !== documentId)
      );
      setTimeout(() => {
        handleCloseConfirmModal();
      }, 1000);
    }
    console.log(response);
  };

  let filteredDocuments;
  if (documents) {
    filteredDocuments = documents.filter((doc) => {
      const matchesSearch = [
        doc.title,
        doc.user.username,
        doc.user.email,
        doc.template.category,
      ].some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));

      // const matchesVerification = (() => {
      //   if (documentType === "verified") return doc.verified && !doc.pending;
      //   if (documentType === "unverified") return !doc.verified && !doc.pending;
      //   if (documentType === "pending") return doc.pending;
      //   return true;
      // })();
      const matchesType =
        documentType === "all" ||
        doc.template.category.toLowerCase() === documentType.toLowerCase();

      const isNotApprovedOrDeclined =
        doc.verification_status !== "Approved" &&
        doc.verification_status !== "Rejected";

      return matchesSearch && matchesType && isNotApprovedOrDeclined;
    });
  }

  useEffect(() => {
    const abc = async () => {
      const response = await fetchLawyerRelatedDocuments(setLoading);
      setDocuments(
        response.data.user_documents.filter((doc) => {
          return doc.pdf_url != null;
        })
      );
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      console.log(response);
    };
    abc();
  }, []);
  // Render loading state if data is still loading
  // if (loading) {
  //   return <p className="text-center my-10">Loading documents...</p>;
  // }
  let categories;
  if (documents) {
    categories = [
      ...new Set(documents.map((template) => template.template.category)),
    ];
  }

  return (
    <div className="flex flex-col items-center w-full py-32 px-8">
      <h1 className="text-2xl font-bold mb-4">Document Requests</h1>
      {loading && <p className="w-full text-center">Loading documents..</p>}
      {!loading && documents && documents.length > 0 && (
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
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mt-4 sm:mt-0 sm:w-3/12"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Document List */}
      {documents && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="border p-4 rounded shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between">
                  <h2 className="font-bold">{doc.title}</h2>
                  <span className="px-2 py-1 text-sm rounded bg-green-200 text-green-700">
                    {doc.template.category}
                  </span>
                </div>
                <div className="flex flex-col items-start w-full mt-2">
                  <h2 className="text-sm font-semibold">From</h2>
                  <h2>{doc.user.username}</h2>
                  <h2>{doc.user.email}</h2>
                </div>
                <div>
                  <button
                    onClick={() => handleOpenModal(doc)}
                    className="mt-4 text-blue-500"
                  >
                    Preview Document
                  </button>
                </div>

                <div className="flex flex-row items-center justify-center w-full mt-4">
                  <button
                    onClick={() => handleOpenConfirmModal("Approved", doc.id)}
                    className="mr-1 flex items-center px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                    Approved
                  </button>

                  <button
                    onClick={() => handleOpenConfirmModal("Rejected", doc.id)}
                    className="ml-1 flex items-center px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                    Rejected
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No documents found.</p>
          )}
        </div>
      )}
      {!loading && documents && documents.length < 1 && (
        <p className="w-full text-center dark:text-white">No Documents yet</p>
      )}
      {/* Preview Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        document={selectedDocument}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmAction}
        action={currentAction}
      />
    </div>
  );
};

export default UserRequests;
