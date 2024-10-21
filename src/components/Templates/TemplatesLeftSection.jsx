import React from "react";

const TemplatesLeftSection = ({
  templates,
  setViewingTemplates,
  allTemplates,
  setSubtypes,
}) => {
  const [selected, setSelected] = React.useState("all");
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    // setSubtypes()
    console.log("first", value);
    // console.log(
    //   templates.find((temp) => {
    //     return temp.category.name == value;
    //   })
    // );
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
          {Object.keys(templates).map((category) => (
            <option key={category} value={category}>
              {category} ({templates[category].length})
            </option>
          ))}
        </select>
      </div>

      {/* List for larger screens */}
      <div className="hidden md:flex flex-col w-full">
        <div
          className={`flex flex-row items-center dark:border border-white p-2 ${
            selected === "all" ? "bg-black text-gray-200" : "bg-gray-200"
          } w-full mt-2 rounded-md justify-between cursor-pointer`}
          onClick={() => {
            setSelected("all");
            setViewingTemplates(allTemplates);
            setSubtypes(null);
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

        {Object.keys(templates).map((category) => (
          <div
            key={category}
            className={`flex flex-row dark:border border-white items-center p-2 ${
              selected === category ? "bg-black text-gray-200" : "bg-gray-200"
            } w-full mt-2 rounded-md justify-between cursor-pointer`}
            onClick={() => {
              setSelected(category);
              setViewingTemplates(templates[category]);

              setSubtypes(
                templates[category][0].category.sub_categories.result
              );
            }}
          >
            <p>{category}</p>
            <p>{templates[category].length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesLeftSection;
