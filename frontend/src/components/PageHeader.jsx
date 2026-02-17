import React, { useEffect, useState } from "react";

function PageHeader() {
    // const [quote, setQoute] = useState(null);
    // const [loading, setLoading] = useState(true);
  
    // fetching quote form external api provider
    // useEffect(() => {
    //   const fetchQuote = async () => {
    //     try {
    //       const res = await fetch(
    //         "https://api.api-ninjas.com/v2/quotes?categories=success",
    //         {
    //           headers: {
    //             "X-Api-Key": "u0NKPGvSSs5ZYQ1CxKCN5cX08riF2iGXbfgs2520",
    //           },
    //         },
    //       );
    //       const data = await res.json();
    //       setLoading(false);
    //       setQoute(data[0].quote);
    //     } catch (error) {
    //       console.error("failed to fetch quote", error);
    //     }
    //   };
  
    //   fetchQuote();
    // });

  return (
    <div>
      <div className="relative mt-24 md:mt-16 text-center px-6">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 faculty text-red-600 mb-4">
          <span className="text-black faculty">TASK</span> MANAGER
        </h2>

        {/* Quote Card */}
        {/* <p className="text-gray-600 text-xs italic">
          {loading ? "Loading quote..." : `“${quote}”`}
        </p> */}
      </div>
    </div>
  );
}

export default PageHeader;
