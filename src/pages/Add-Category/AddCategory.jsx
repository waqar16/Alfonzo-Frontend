import React, { useEffect, useState } from "react";
// import { createNewCategory } from "../../services/category-services"; // You can replace with the actual service for creating category
import { notify } from "../../utilities/toast";
import { Toaster } from "react-hot-toast";
import {
  createNewCategory,
  fetchCategories,
} from "../../services/template-services";
import Loader from "../../components/Loader/Loader";
const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([]); // All subcategories
  const [newSubCategory, setNewSubCategory] = useState(""); // Temp new subcategory
  const [loading, setLoading] = useState(false); // Loading state
  const [errors, setErrors] = useState({
    categoryName: "",
    subCategories: "",
  });

  // Validate form fields
  const validateFields = () => {
    const newErrors = {};
    if (!categoryName) newErrors.categoryName = "Category name is required.";
    if (subCategories.length === 0)
      newErrors.subCategories = "At least one subcategory is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle adding subcategories
  const handleAddSubCategory = () => {
    if (newSubCategory.trim()) {
      setSubCategories([...subCategories, newSubCategory]);
      setNewSubCategory("");
    } else {
      setErrors({ ...errors, subCategories: "Subcategory cannot be empty." });
    }
  };

  // Handle saving the category with its subcategories
  const handleSaveCategory = async () => {
    if (!validateFields()) return; // Stop if validation fails

    const newCategory = await createNewCategory(
      {
        name: categoryName,
        sub_categories: {
          result: subCategories.map((sub) => {
            return sub;
          }),
        },
      },
      setLoading
    );
    console.log("New Category", newCategory);

    if (newCategory.status === 201) {
      notify("Category Added Successfully", "success");
      setCategoryName("");
      setSubCategories([]);
      setNewSubCategory("");
    }
  };

  return (
    <div className="container mx-auto p-6 dark:bg-black bg-gray-200 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Admin: Add New Category</h1>

      {/* Category Name */}
      <div className="mb-4">
        <label className="block dark:text-white text-slate-900">
          Category Name
        </label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => {
            if (e.target.value !== "") {
              setErrors({
                ...errors,
                categoryName: "",
              });
            } else {
              setErrors({
                ...errors,
                categoryName: "Required",
              });
            }
            setCategoryName(e.target.value);
          }}
          className="w-full mt-1 p-2  s rounded-md shadow-sm text-black-2 focus:outline-none focus:ring-0"
          placeholder="Enter category name"
        />
        {errors.categoryName && (
          <p className="text-red-500 text-xs">{errors.categoryName}</p>
        )}
      </div>

      {/* Add Subcategory */}
      <div className="mb-4">
        <label className="block dark:text-white text-gray-700">
          Add Subcategory
        </label>
        <div className="flex mt-2">
          <input
            type="text"
            value={newSubCategory}
            onChange={(e) => {
              if (e.target.value !== "") {
                setErrors({
                  ...errors,
                  subCategories: "",
                });
              } else {
                setErrors({
                  ...errors,
                  subCategories: "Subcategory cannot be empty.",
                });
              }
              setNewSubCategory(e.target.value);
            }}
            className="text-black-2 flex-grow p-2 border-none rounded-l-md shadow-sm focus:outline-none focus:ring-0"
            placeholder="Enter a subcategory"
          />
          <button
            type="button"
            onClick={handleAddSubCategory}
            className="p-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600"
          >
            Add Subcategory
          </button>
        </div>
        {errors.subCategories && (
          <p className="text-red-500 text-xs">{errors.subCategories}</p>
        )}
      </div>

      {/* Subcategories List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Subcategories</h3>
        <ul className="list-disc list-inside">
          {subCategories.map((subCategory, index) => (
            <li key={index} className="dark:text-zinc-400 text-gray-700 mb-2">
              {subCategory}
            </li>
          ))}
        </ul>
      </div>

      {/* Save Category */}
      <button
        type="button"
        onClick={handleSaveCategory}
        className="w-[200px] px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
      >
        {loading ? <Loader /> : "Save Category"}
      </button>
      <Toaster />
    </div>
  );
};

export default AddCategory;
