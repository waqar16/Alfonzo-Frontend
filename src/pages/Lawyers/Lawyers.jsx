import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { notify } from "../../utilities/toast";
import { Toaster } from "react-hot-toast";
import { fetchAllLawyers } from "../../services/lawyer-services";
import { setPreferedLawyer } from "../../services/user-services";

const Lawyers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lawyers, setLawyers] = useState(null);
  const [preferredLawyerId, setPreferredLawyerId] = useState(
    localStorage.getItem("preferredLawyer")
  ); // State for tracking preferred lawyer
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLawyers = async () => {
      const lawyer = await fetchAllLawyers(setLoading);
      setLawyers(lawyer.data.results);
    };
    fetchLawyers();
  }, []);

  const filteredLawyers = lawyers?.filter(
    (lawyer) =>
      lawyer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const setPreferredLawyer = async (lawyerId) => {
    const response = await setPreferedLawyer(lawyerId, setLoading);
    if (response.status == 200) {
      notify("Lawyer selected as preferred lawyer", "success");
      localStorage.setItem("preferredLawyer", lawyerId);
    } else {
      notify("Something Went Wrong try again later", "error");
    }
    setPreferredLawyerId(lawyerId); // Only one lawyer can be set as preferred
  };

  return (
    <div className="flex flex-col items-center py-24 pt-32 px-4 md:px-16">
      <h1 className="text-3xl md:text-2xl font-bold dark:text-white text-black text-center mb-2">
        Select Your Favorite Lawyers
      </h1>
      <input
        type="text"
        placeholder="Search lawyers..."
        className="border border-gray-300 rounded-lg p-2 w-10/12 md:w-1/3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-10/12">
        {lawyers &&
          filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className={`dark:bg-slate-900 bg-gray-100 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-200 hover:shadow-xl cursor-pointer relative ${
                lawyer.id === preferredLawyerId
                  ? "border-2 border-blue-500"
                  : ""
              }`}
            >
              <img
                src={lawyer.profile_pic}
                alt={lawyer.first_name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="dark:text-zinc-300 text-gray-600">
                  {`${lawyer.first_name} ${lawyer.last_name}`}
                </p>
                <p className="dark:text-zinc-400 text-gray-500 text-sm">
                  {lawyer.email}
                </p>
              </div>
              <div className="w-full flex flex-row items-center justify-center">
                {lawyer.id == preferredLawyerId ? (
                  <span className="p-4   text-slate-900 dark:text-zinc-400">
                    Marked as preferred
                  </span>
                ) : (
                  <button
                    className={`my-2 p-2 rounded-lg ${
                      lawyer.id == preferredLawyerId
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => setPreferredLawyer(lawyer.id)}
                  >
                    Set as Prefered
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
      {lawyers && filteredLawyers.length < 1 && (
        <p className="text-center dark:text-zinc-400 text-black">
          No Lawyers found
        </p>
      )}

      <Toaster />
    </div>
  );
};

export default Lawyers;
