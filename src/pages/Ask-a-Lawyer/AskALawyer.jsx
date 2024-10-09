import React, { useEffect, useState } from "react";
import { fetchAllLawyers } from "../../services/lawyer-services";
import { useForm } from "react-hook-form";
import SelectLawyer from "../SelectLawyer/SelectLawyer";
import { notify } from "../../utilities/toast";
import { Toaster } from "react-hot-toast";
import { addQuery } from "../../services/query-services";

const AskALawyer = () => {
  const [lawyers, setLawyers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [lawyerSelected, setLawyerSelected] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);
    const addNewQuery = await addQuery(
      {
        message: data.query,
        lawyer: lawyerSelected.id,
      },
      setLoading
    );
    if (addNewQuery.status == 200) {
      notify("Your Query Added Succesfully", "Success");
      reset();
    } else {
      notify(addNewQuery.error, "error");
    }
  };

  useEffect(() => {
    const sdas = async () => {
      const lawyer = await fetchAllLawyers(setLoading);
      setLawyers(lawyer.data.results);
      console.log(lawyer.data.results);
      console.log(lawyer, "lawyer");
    };
    sdas();
  }, []);
  let filteredLawyers = [];
  if (lawyers) {
    filteredLawyers = lawyers.filter(
      (lawyer) =>
        lawyer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="dark:bg-black flex flex-col items-center w-full py-32 px-4 md:px-8">
      <h1 className="mb-4 text-3xl md:text-2xl dark:text-white font-bold text-black text-center md:text-start">
        {lawyerSelected
          ? "Fill Out the form below"
          : "Select any of our trusted lawyers"}
      </h1>
      {!lawyerSelected && (
        <input
          type="text"
          placeholder="Search lawyers..."
          className="border border-gray-300 rounded-lg p-2 mt-4 my-2 w-10/12 md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      {loading && !lawyerSelected && (
        <p className="text-center mt-6 text-lg dark:text-white">
          Loading lawyers...
        </p>
      )}

      {/* Grid displaying lawyers */}
      {lawyers && !lawyerSelected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full">
          {filteredLawyers &&
            filteredLawyers.length > 0 &&
            filteredLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="dark:bg-slate-900 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center"
              >
                <div className="text-center flex flex-col items-center">
                  <div className="w-18 h-18 flex flex-col items-center justify-center my-2 overflow-hidden rounded-full">
                    <img
                      className="object-cover w-20 h-20"
                      src={lawyer.profile_pic}
                    />
                  </div>
                  <h3 className="text-lg font-bold dark:text-white">
                    {lawyer.first_name} {lawyer.last_name}
                  </h3>
                  <p className="dark:text-zinc-400 text-sm text-gray-600 dark:text-gray-300">
                    {lawyer.email}
                  </p>
                  <p className="dark:text-zinc-400 text-sm text-gray-600 dark:text-gray-300">
                    {lawyer.phone}
                  </p>
                </div>
                <button
                  className="mt-4 my-2 px-4 py-2 dark:bg-white  dark:text-black bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => {
                    setLawyerSelected(lawyer);
                    console.log("lawyer", lawyer);
                  }}
                >
                  Ask
                </button>
              </div>
            ))}
          {filteredLawyers && filteredLawyers.length < 1 && (
            <p className="text-center dark:text-white w-full col-span-full">
              No lawyers found.
            </p>
          )}
        </div>
      )}
      {lawyerSelected && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-7/12 sm:w-10/12 w-full"
        >
          {/* Lawyer Email */}
          <div>
            <label
              htmlFor="lawyerEmail"
              className="block text-sm font-medium dark:text-gray-200"
            >
              Lawyer's Email
            </label>
            <input
              type="email"
              disabled
              id="lawyerEmail"
              {...register("lawyerEmail")}
              defaultValue={lawyerSelected.email}
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500 bg-white text-gray-800 disabled:opacity-100"
            />
            {errors.lawyerEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lawyerEmail.message}
              </p>
            )}
          </div>

          {/* User Email */}
          <div>
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium dark:text-gray-200 mt-4 my-2"
            >
              Your Email
            </label>
            <input
              type="email"
              disabled
              id="userEmail"
              {...register("userEmail")}
              defaultValue={localStorage.getItem("email")}
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500 bg-white text-gray-800 disabled:opacity-100"
            />
            {errors.userEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userEmail.message}
              </p>
            )}
          </div>

          {/* Query */}
          <div>
            <label
              htmlFor="query"
              className="block text-sm font-medium dark:text-gray-200 mt-4 my-2"
            >
              Query
            </label>
            <textarea
              id="query"
              {...register("query", {
                required: "Query is required",
                minLength: {
                  value: 10,
                  message: "Query must be at least 10 characters long",
                },
              })}
              rows="5"
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
            {errors.query && (
              <p className="text-red-500 text-sm mt-1">
                {errors.query.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="mt-4 my-2 w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          <Toaster />
        </form>
      )}
    </div>
  );
};

export default AskALawyer;
