import React, { useEffect, useState } from "react";
import {
  fetchTemplates,
  deleteTemplate,
} from "../../services/template-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { notify } from "../../utilities/toast";
import Loader from "../Loader/Loader";
import { Toaster } from "react-hot-toast";
const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  templateName,
  buttonLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="dark:bg-slate-950 bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-6">
          Are you sure you want to delete the template{" "}
          <strong>{templateName}</strong>? This action cannot be undone.
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

const TemplatesAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control modal visibility
  const [templateToDelete, setTemplateToDelete] = useState(null); // Template to delete

  useEffect(() => {
    const fetchTemplatesData = async () => {
      const response = await fetchTemplates(setLoading);
      if (response.status === 200) {
        setTemplates(response.data);
      }
      console.log(response);
    };
    fetchTemplatesData();
  }, []);

  const handleViewTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const handleDeleteTemplate = async () => {
    if (templateToDelete) {
      try {
        const response = await deleteTemplate(
          templateToDelete.id,
          setButtonLoading
        );
        if (response.status == 204) {
          setTemplates(
            templates.filter((template) => template.id !== templateToDelete.id)
          );
          notify("Template deleted successfully!");
        } else {
          notify("Failed to delete the template. Please try again.", "error");
        }
      } catch (error) {
        console.error("Error deleting template:", error);
        alert("An error occurred while deleting the template.");
      }
      setTemplateToDelete(null); // Clear the selected template after deletion
      setIsDeleteModalOpen(false); // Close modal
    }
  };

  const openDeleteModal = (template) => {
    setTemplateToDelete(template);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTemplateToDelete(null); // Reset template when cancel is clicked
  };

  const handleBackToList = () => {
    setSelectedTemplate(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {!selectedTemplate && (
        <h4 className="mb-6 text-xl font-semibold text-center text-black dark:text-white">
          Templates
        </h4>
      )}

      {selectedTemplate ? (
        <div className="flex flex-col items-center">
          <h5 className="text-lg font-semibold first-letter:capitalize">
            {selectedTemplate.name}
          </h5>
          <div
            className="border p-4 rounded-lg mt-4 w-full"
            dangerouslySetInnerHTML={{ __html: selectedTemplate.content }}
          />
          <button
            onClick={handleBackToList}
            className="my-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Back to List
          </button>
        </div>
      ) : (
        <div>
          {templates.length === 0 ? (
            <div className="flex flex-col items-center w-full mb-8">
              <p className="text-center">
                No Templates to Show. Add new templates to preview them.
              </p>
              <NavLink
                to={"/admin/add-template"}
                className="w-auto p-2 dark:bg-white bg-slate-900 dark:text-slate-900 text-white rounded-lg mt-2 font-semibold"
              >
                Add Template
              </NavLink>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-5 rounded-sm bg-gray-200 dark:bg-meta-4">
                <div className="text-center p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Id
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Name
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Category
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Sub Category
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Action
                  </h5>
                </div>
              </div>

              {templates.map((template) => (
                <div
                  className="grid grid-cols-5 border-b border-stroke dark:border-strokedark"
                  key={template.id}
                >
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">{template.id}</p>
                  </div>
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">
                      {template.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">
                      {template.category.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">
                      {template.sub_category.name}
                    </p>
                  </div>
                  <div className="flex justify-center p-2.5 xl:p-5 space-x-3.5">
                    <button
                      onClick={() => handleViewTemplate(template)}
                      className="dark:text-white text-slate-900 dark:hover:text-gray-100 hover:text-slate-500"
                      aria-label="View"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="dark:text-white text-slate-900 dark:hover:text-gray-100 hover:text-slate-500"
                      aria-label="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(template)}
                      className="dark:text-white text-slate-900 dark:hover:text-gray-100 hover:text-slate-500"
                      aria-label="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Render ConfirmationModal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteTemplate}
        onCancel={closeDeleteModal}
        templateName={templateToDelete?.name}
        buttonLoading={buttonLoading}
      />
      <Toaster />
    </div>
  );
};

export default TemplatesAdmin;
