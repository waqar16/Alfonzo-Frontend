import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLawyer } from "../../redux/reducers/lawyer-reducer";
import { useDispatch } from "react-redux";
import { fetchAllLawyers } from "../../services/lawyer-services";
import Loader from "../../components/Loader/Loader";
import Templates from "../Templates/Templates";

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

const SelectLawyer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToPage = () => {
    navigate("/templates/finalize-template");
  };
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  let PreferredLawyer;
  if (lawyers) {
    PreferredLawyer = lawyers.find(
      (lawyer) => lawyer.id == parseInt(localStorage.getItem("preferredLawyer"))
    );

    filteredLawyers = lawyers.filter(
      (lawyer) =>
        lawyer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="flex flex-col dark:bg-black items-center py-24 pt-32 px-4 md:px-16">
      <h1 className="text-[16px]">LAWYERS</h1>
      <h1 className="text-3xl md:text-2xl dark:text-white font-bold text-black text-center md:text-start">
        Select any of our trusted lawyers
      </h1>
      <input
        type="text"
        placeholder="Search lawyers..."
        className="border border-gray-300 rounded-lg p-2 mt-4 w-10/12 md:w-1/3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {lawyers && PreferredLawyer && (
        <div className="w-10/12 flex flex-col items-start mt-8">
          <h1 className="dark:text-white text-black text-2xl font-bold mb-2">
            Your preferred lawyer
          </h1>
          <div
            key={PreferredLawyer.id}
            onClick={() => {
              dispatch(setLawyer(PreferredLawyer));
              navigateToPage();
            }}
            className="dark:bg-slate-900 bg-white shadow-lg rounded-lg overflow-hidden  cursor-pointer relative"
          >
            <img
              src={PreferredLawyer.profile_pic}
              alt={PreferredLawyer.name}
              className="w-full h-40 object-cover  "
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold dark:text-white">{`${PreferredLawyer.first_name} ${PreferredLawyer.last_name}`}</h2>
            </div>

            {/* {selectedLawyer && selectedLawyer.id === PreferredLawyer.id && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-white transition-opacity duration-300">
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold">{PreferredLawyer.name}</h3>
                  <p className="mt-2">{PreferredLawyer.description}</p>
                  <button
                    className="dark:bg-slate-900 dark:text-white bg-white text-black p-2 px-4 rounded-md mt-4 border hover:border-white hover:text-white hover:bg-black transition-colors duration-300"
                    onClick={() => {
                      dispatch(setLawyer(PreferredLawyer));
                      navigateToPage();
                    }}
                  >
                    Hire
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      )}
      {lawyers && !loading && PreferredLawyer && (
        <h1 className="dark:text-white text-black text-2xl font-bold mb-2 w-full text-center">
          Other Lawyers
        </h1>
      )}
      {lawyers && !loading && lawyers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-10/12">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              onMouseEnter={() => setSelectedLawyer(lawyer)}
              onMouseLeave={() => setSelectedLawyer(null)}
              className="dark:bg-slate-900 bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 cursor-pointer relative"
            >
              <img
                src={lawyer.profile_pic}
                alt={lawyer.name}
                className="w-full h-40 object-cover  "
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold dark:text-white">{`${lawyer.first_name} ${lawyer.last_name}`}</h2>
                {/* <p className="dark:texttext-gray-600">{lawyer.specialty}</p> */}
              </div>

              {selectedLawyer && selectedLawyer.id === lawyer.id && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-white transition-opacity duration-300">
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold">{lawyer.name}</h3>
                    <p className="mt-2">{lawyer.description}</p>
                    <button
                      className="dark:bg-slate-900 dark:text-white bg-white text-black p-2 px-4 rounded-md mt-4 border hover:border-white hover:text-white hover:bg-black transition-colors duration-300"
                      onClick={() => {
                        dispatch(setLawyer(lawyer));
                        navigateToPage();
                      }}
                    >
                      Hire
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        lawyers &&
        !loading &&
        lawyers.length < 1 && (
          <h1 className="text-center dark:text-white ">No Lawyer found</h1>
        )
      )}
      {loading && (
        <p className="text-zinc-400 w-full text-center">Loading...</p>
      )}
    </div>
  );
};

export default SelectLawyer;
