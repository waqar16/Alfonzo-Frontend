import React from "react";

const TemplatesLeftSection = ({
  templates,
  setViewingTemplates,
  allTemplates,
}) => {
  const [selected, setSelected] = React.useState("all");
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    setViewingTemplates(value === "all" ? allTemplates : templates[value]);
  };

  return (
    <div className="col-span-8 md:col-span-2 w-full flex flex-col items-center transition-none duration-500">
      {/* Dropdown for small screens */}
      <div className="md:hidden w-full mt-2 ">
        <select
          value={selected}
          onChange={handleSelectChange}
          className="p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="all">All</option>
          {Object.keys(templates).map((type) => (
            <option key={type} value={type}>
              {type} ({templates[type].length})
            </option>
          ))}
        </select>
      </div>

      {/* List for larger screens */}
      <div className="hidden md:flex flex-col w-full">
        <div
          className={`flex flex-row items-center p-2 ${
            selected === "all" ? "bg-black text-gray-200" : "bg-gray-200"
          } w-full mt-2 rounded-md justify-between cursor-pointer`}
          onClick={() => {
            setSelected("all");
            setViewingTemplates(allTemplates);
          }}
        >
          <p>All</p>
          <p>
            {Object.values(templates).reduce(
              (acc, curr) => acc + curr.length,
              0
            )}
          </p>
        </div>

        {Object.keys(templates).map((type) => (
          <div
            key={type}
            className={`flex flex-row items-center p-2 ${
              selected === type ? "bg-black text-gray-200" : "bg-gray-200"
            } w-full mt-2 rounded-md justify-between cursor-pointer`}
            onClick={() => {
              setSelected(type);
              setViewingTemplates(templates[type]);
            }}
          >
            <p>{type}</p>
            <p>{templates[type].length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesLeftSection;
