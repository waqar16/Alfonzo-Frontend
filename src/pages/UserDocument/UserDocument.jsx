import React, { useState, useEffect } from "react";

// Sample data array
const documents = [
  {
    id: 1,
    title: "Document 1",
    link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",
    verified: true,
    pending: false,
  },
  {
    id: 2,
    title: "Document 2",
    link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",
    verified: false,
    pending: true,
  },
  {
    id: 3,
    title: "Document 3",
    link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",

    verified: true,
    pending: false,
  },
  {
    id: 4,
    title: "Document 4",
    link: "https://drive.google.com/file/d/1CuWLS-Gg_v7SN0njGinwDFAygf-I3FVk/preview?usp=sharing",

    verified: false,
    pending: false,
  },
];

const UserDocument = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("verified");
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("title"); // For sorting

  // Simulate fetching data from an API
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

  // Filter and sort documents based on search term and verification status
  const filteredDocuments = documents
    .filter((doc) => {
      const matchesSearch = doc.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesVerification = (() => {
        if (verificationStatus === "verified")
          return doc.verified && !doc.pending;
        if (verificationStatus === "unverified")
          return !doc.verified && !doc.pending;
        if (verificationStatus === "pending") return doc.pending;
        return true;
      })();

      return matchesSearch && matchesVerification;
    })
    .sort((a, b) => {
      if (sortType === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortType === "status") {
        return a.verified === b.verified ? 0 : a.verified ? -1 : 1;
      }
      return 0;
    });

  // Render loading state if data is still loading
  if (loading) {
    return <p className="text-center my-10">Loading documents...</p>;
  }

  return (
    <div className="flex flex-col items-center w-full my-32 px-8">
      <h1 className="text-2xl font-bold mb-4">User Documents</h1>

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

      {/* Document List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="border p-4 rounded shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <h2 className="font-semibold">{doc.title}</h2>
                {/* Verification Badge */}
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    doc.verified
                      ? "bg-green-200 text-green-700"
                      : doc.pending
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {doc.verified
                    ? "Verified"
                    : doc.pending
                    ? "Pending Verification"
                    : "Unverified"}
                </span>
              </div>
              <iframe
                src={doc.link}
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
    </div>
  );
};

export default UserDocument;
