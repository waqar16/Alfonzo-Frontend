import React, { useState } from "react";

// Sample queries array
const queries = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    message:
      "I need help with document verification. I tried uploading my document several times, but it doesn't seem to be processing correctly. Could you guide me through the steps, or let me know if there's an alternative way to get the document verified? Also, I'd like to understand the time frame for verification, and whether or not I will be notified via email once the process is completed.",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    message: "Can you explain the membership benefits in more detail?  ",
  },
  {
    id: 3,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    message:
      "I'm facing issues with logging in to my account. Every time I enter my credentials, the system seems to refresh and returns me to the login page without any error message. I have tried resetting my password, clearing my browser cache, and even switching devices, but nothing seems to work. Can someone assist me with resolving this issue as soon as possible?",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    message:
      "Is there a way to change my account details? I recently changed my email address and would like to update it in the system. I also want to update my phone number and check whether my previous details were used in any recent transactions or document signings. Please let me know the steps to make these changes and ensure that my account is secure.",
  },
  {
    id: 5,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    message:
      "How do I lock a lawyer for my documents? I'm looking for a way to choose a preferred lawyer for signing all my documents, but I'm unsure how to do this in the platform. Will the lawyer be notified each time I create a new document, and do I need to contact them separately? Also, is there an option to switch lawyers later if needed?",
  },
];

const UserQueries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [reply, setReply] = useState("");

  // Filter queries based on the search term
  const filteredQueries = queries.filter((query) =>
    Object.values(query)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Function to handle sending the reply (replace with actual functionality)
  const sendReply = () => {
    alert(`Reply sent: ${reply}`);
    setReply("");
    setSelectedQuery(null); // Close the modal after sending
  };

  return (
    <div className="container mx-auto px-4 py-12 relative mt-12 sm:mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">User Queries</h1>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name, email, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQueries.length > 0 ? (
          filteredQueries.map((query) => (
            <div
              key={query.id}
              className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedQuery(query)} // Open modal with query details
            >
              <h2 className="text-md font-semibold ">{query.name}</h2>
              <p className="text-gray-600 mb-2 text-xs">{query.email}</p>
              <p className="text-gray-800 text-sm text-graydark line-clamp-3">
                {query.message}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No queries found.
          </p>
        )}
      </div>

      {/* Modal for Viewing Message */}
      {selectedQuery && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedQuery(null)} // Close modal
            >
              ✕
            </button>

            {/* Query Details */}
            <h2 className="text-xl font-bold mb-2">{selectedQuery.name}</h2>
            <p className="text-gray-600 mb-4">{selectedQuery.email}</p>
            <p className="text-gray-800 mb-6">{selectedQuery.message}</p>

            {/* Reply Input */}
            <div className="flex flex-row items-end">
              <textarea
                rows={4}
                type="text"
                placeholder="Type your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="min-h-20 flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                className="ml-4 text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
                onClick={sendReply} // Handle reply
              >
                ✈️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserQueries;
