import React, { useState, useEffect } from "react";
import { fetchUserDocuments } from "../../services/document-services";

// Sample data array
// const documents = [
//   {
//     id: 1,
//     title: "Document 1",
//     link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",
//     verified: true,
//     pending: false,
//   },
//   {
//     id: 2,
//     title: "Document 2",
//     link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",
//     verified: false,
//     pending: true,
//   },
//   {
//     id: 3,
//     title: "Document 3",
//     link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",

//     verified: true,
//     pending: false,
//   },
//   {
//     id: 4,
//     title: "Document 4",
//     link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",

//     verified: false,
//     pending: false,
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
const UserDocument = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("verified");
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("title"); // For sorting
  const [documents, setDocuments] = useState([]); // For sorting

  // Simulate fetching data from an API
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); // Simulate loading delay
  // }, []);
  useEffect(() => {
    const abc = async () => {
      const response = await fetchUserDocuments(setLoading);
      setDocuments(
        response.data.results.filter((document) => {
          return document.pdf_url != null;
        })
      );
      console.log(response.data.results, "documents");
    };
    abc();
  }, []);
  // Filter and sort documents based on search term and verification status
  let filteredDocuments;

  if (documents) {
    filteredDocuments = documents.filter((doc) => {
      const matchesSearch = doc.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }

  // if (loading) {
  //   return <
  // }

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
          <option value="all">All</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
          <option value="pending">Pending Verification</option>
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
                      doc.verification_status == "Not Specified"
                        ? "bg-yellow-200 text-yellow-700"
                        : doc.verification_status == "Verified"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {doc.verification_status}
                  </span>
                </div>
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
              </div>
            ))
          ) : (
            <p>No documents found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDocument;
