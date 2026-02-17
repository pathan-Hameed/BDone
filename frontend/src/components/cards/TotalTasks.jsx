import React from "react";
import { FiLayers } from "react-icons/fi";


function TotalTasks(props) {
  return (
    <div
      className="
            relative
            w-full 
            p-6
            rounded-2xl
            bg-white
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            overflow-hidden
            group
          "
    >
      {/* Subtle Background Accent */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-50 group-hover:scale-110 transition duration-500"></div>

      {/* Content */}
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 tracking-wide uppercase">
            {props.title}
          </p>

          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            {props.number}
          </h2>

          <p className="text-sm text-gray-400 mt-1">{props.description}</p>
        </div>

        {/* Icon */}
        <div
          className="
              p-4 
              rounded-xl 
              bg-indigo-50 
              text-indigo-600 
              text-2xl
            "
        >
          <FiLayers />
        </div>
      </div>
    </div>
  );
}

export default TotalTasks;
