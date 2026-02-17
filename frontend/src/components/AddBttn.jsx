import React from "react";
import { IoAdd } from "react-icons/io5";

function AddBttn({onClick}) {
  return (
    <div>
      <button
        className="flex items-center gap-2 
                   w-full
                  bg-blue-500 hover:bg-blue-600 
                  text-white font-semibold 
                  px-8 py-4 rounded-2xl 
                  shadow-lg hover:shadow-xl 
                  transition-all duration-300 
                  hover:-translate-y-1 active:scale-95"
        onClick={onClick}
      >
        <IoAdd size={22} />
        ADD TASK
      </button>
    </div>
  );
}

export default AddBttn;
