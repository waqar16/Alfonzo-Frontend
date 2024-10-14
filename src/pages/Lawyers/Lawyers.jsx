import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { notify } from "../../utilities/toast";
import { Toaster } from "react-hot-toast";
import { fetchAllLawyers } from "../../services/lawyer-services";
// const lawyers = [
//   {
//     id: 1,
//     name: "John Doe",
//     specialty: "Corporate Law",
//     image: "/assets/jacky.jpg",
//     description: "Expert in corporate governance and compliance.",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     specialty: "Family Law",
//     image: "/assets/amitab.jpg",
//     description: "Specializes in divorce and child custody cases.",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     specialty: "Criminal Law",
//     image: "/assets/amitab.jpg",
//     description:
//       "Defending clients in criminal cases with a high success rate.",
//   },
//   {
//     id: 4,
//     name: "Bob Brown",
//     specialty: "Intellectual Property",
//     image: "/assets/OIP.jpeg",
//     description: "Helping clients protect their creative works.",
//   },
//   {
//     id: 5,
//     name: "Emily Davis",
//     specialty: "Tax Law",
//     image: "/assets/amitab.jpg",
//     description: "Advising on tax compliance and regulations.",
//   },
//   {
//     id: 6,
//     name: "Michael Wilson",
//     specialty: "Real Estate Law",
//     image: "/assets/amitab.jpg",
//     description: "Guiding clients through property transactions.",
//   },
//   {
//     id: 7,
//     name: "Chris Lee",
//     specialty: "Labor Law",
//     image: "/assets/amitab.jpg",
//     description: "Defending employee rights and workplace justice.",
//   },
//   {
//     id: 8,
//     name: "Sarah White",
//     specialty: "Personal Injury",
//     image: "/assets/amitab.jpg",
//     description: "Helping clients get compensation for injuries.",
//   },
//   {
//     id: 9,
//     name: "David Green",
//     specialty: "Environmental Law",
//     image: "/assets/amitab.jpg",
//     description: "Advocating for sustainable practices and policies.",
//   },
//   {
//     id: 10,
//     name: "Laura Black",
//     specialty: "Bankruptcy Law",
//     image: "/assets/amitab.jpg",
//     description: "Guiding clients through financial distress.",
//   },
//   {
//     id: 11,
//     name: "Daniel Harris",
//     specialty: "Immigration Law",
//     image: "/assets/amitab.jpg",
//     description: "Helping clients navigate immigration processes.",
//   },
//   {
//     id: 12,
//     name: "Sophia Martin",
//     specialty: "Healthcare Law",
//     image: "/assets/amitab.jpg",
//     description: "Advising healthcare providers on legal matters.",
//   },
//   {
//     id: 13,
//     name: "James Thompson",
//     specialty: "Entertainment Law",
//     image: "/assets/amitab.jpg",
//     description: "Protecting artists and their creative rights.",
//   },
//   {
//     id: 14,
//     name: "Olivia Garcia",
//     specialty: "Civil Rights",
//     image: "/assets/amitab.jpg",
//     description: "Fighting for equality and justice.",
//   },
//   {
//     id: 15,
//     name: "William Martinez",
//     specialty: "Cyber Law",
//     image: "/assets/amitab.jpg",
//     description: "Advising on online privacy and data protection.",
//   },
//   {
//     id: 16,
//     name: "Mia Robinson",
//     specialty: "Contract Law",
//     image: "/assets/amitab.jpg",
//     description: "Drafting and reviewing contracts for clients.",
//   },
//   {
//     id: 17,
//     name: "Ethan Lewis",
//     specialty: "Family Business Law",
//     image: "/assets/amitab.jpg",
//     description: "Advising family-owned businesses on legal issues.",
//   },
//   {
//     id: 18,
//     name: "Isabella Walker",
//     specialty: "Consumer Rights",
//     image: "/assets/amitab.jpg",
//     description: "Defending consumer rights and interests.",
//   },
//   {
//     id: 19,
//     name: "Noah Hall",
//     specialty: "Sports Law",
//     image: "/assets/amitab.jpg",
//     description: "Representing athletes and sports organizations.",
//   },
//   {
//     id: 20,
//     name: "Ava Young",
//     specialty: "Elder Law",
//     image: "/assets/amitab.jpg",
//     description: "Helping seniors with legal issues and planning.",
//   },
// ];

const Lawyers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lawyers, setLawyers] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const sdas = async () => {
      const lawyer = await fetchAllLawyers(setLoading);
      setLawyers(lawyer.data.results);
      console.log(lawyer.data.results);
      console.log(lawyer, "lawyer");
    };
    sdas();
  }, []);
  let filteredLawyers;
  if (lawyers) {
    filteredLawyers = lawyers.filter(
      (lawyer) =>
        lawyer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const toggleFavorite = (lawyer) => {
    if (favorites.includes(lawyer.id)) {
      setFavorites(favorites.filter((id) => id !== lawyer.id));
    } else {
      setFavorites([...favorites, lawyer.id]);
    }
  };

  return (
    <div className="flex flex-col items-center py-24 pt-32 px-4 md:px-16">
      <h1 className="text-3xl md:text-2xl font-bold text-black text-center mb-8">
        Select Your Favorite Lawyers
      </h1>
      <input
        type="text"
        placeholder="Search lawyers..."
        className="border border-gray-300 rounded-lg p-2 mt-4 w-10/12 md:w-1/3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-10/12">
        {lawyers &&
          filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="dark:bg-slate-900 bg-gray-100 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-200 hover:shadow-xl cursor-pointer relative"
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
                <button
                  className={`absolute top-2 right-4 p-2 rounded-full ${
                    favorites.includes(lawyer.id)
                      ? "text-red-600"
                      : "text-white hover:text-red-600 duration-300 transition-colors"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent div's onClick
                    toggleFavorite(lawyer);
                    notify(
                      favorites.includes(lawyer.id)
                        ? "Remove from favourites"
                        : "Added to favourites",
                      "success"
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </button>
              </div>
            </div>
          ))}
      </div>
      {favorites.length > 0 && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold">Your Favorite Lawyers:</h2>
          <ul className="mt-4">
            {favorites.map((id) => {
              const favoriteLawyer = lawyers.find((lawyer) => lawyer.id === id);
              return <li key={id}>{favoriteLawyer.name}</li>;
            })}
          </ul>
        </div>
      )}
      <Toaster />
    </div>
  );
};
export default Lawyers;
