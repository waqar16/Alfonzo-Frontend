import React from "react";

function Loader({ color, className, size }) {
  return (
    <div
      className={`flex flex-row items-center justify-center ${className} w-full`}
    >
      <div
        className={`mr-4 animate-spin rounded-full border-2 border-t-transparent border-${color}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
    </div>
  );
}

export default Loader;
