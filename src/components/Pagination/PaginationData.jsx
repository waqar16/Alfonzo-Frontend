import React, { useState, useEffect } from "react";
import axios from "axios";

const PaginationData = (
  url,
  data,
  nextUrl,
  setNextUrl,
  setLoading,
  prevUrl,
  setPrevUrl,
  currentUrl,
  setCurrentUrl,
  loading
) => {
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data &&
        data.length > 0 && (
          <>
            <ul>
              {data.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="pagination-controls">
              <button
                onClick={() => setCurrentUrl(prevUrl)}
                disabled={!prevUrl}
                className="btn"
              >
                Previous
              </button>

              <button
                onClick={() => setCurrentUrl(nextUrl)}
                disabled={!nextUrl}
                className="btn"
              >
                Next
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default PaginationData;
