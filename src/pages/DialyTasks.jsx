import React, { useState } from "react";

function DialyTasks() {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <div className="px-2 py-4 md:px-12 md:py-12 flex flex-col justify-start">
      {/* these tasks are to be added on daily basis  */}
      <div className="flex items-center justify-between w-full">
        <h2 className="font-semibold text-2xl md:text-3xl">Daily Tasks</h2>
        <button
          className={`text-md md:text-xl border px-4 py-2 md:px-6 md:py-2 bg-blue-600 rounded-md active:bg-blue-800 hover:bg-blue-400 outline-none font-bold text-white ${isAdded ? "hidden" : "display"}`}
          type="button"
          onClick={() => setIsAdded(!isAdded)}
        >
          ADD+
        </button>
        <button
          className={`text-md md:text-xl border px-4 py-2 md:px-6 md:py-2 bg-blue-600 rounded-md active:bg-blue-800 hover:bg-blue-400 outline-none text-white font-bold ${isAdded ? "display" : "hidden"}`}
          type="button"
          onClick={() => setIsAdded(!isAdded)}
        >
          X
        </button>
      </div>

      {/* would appear when clicked on add button  */}
      <div className={`mt-8 md:mt-12 ${isAdded ? "display" : "hidden"}`}>
      </div>
    </div>
  );
}

export default DialyTasks;
