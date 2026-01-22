import React from "react";

export default function Home() {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-12 w-full md:w-[50%] lg:w-[50%]">
        <h1 className=".outfit font-bold text-3xl text-center text-cyan-900">
          Task Manager
        </h1>
        <form id="task-input" className="w-full">
          <div className="flex items-center justify-between gap-4">
            <input
              className="border border-gray-200 rounded-md px-2 py-2 w-full outline-none"
              type="text"
              name=""
              id="task-title"
              placeholder="Enter your task here..."
            />
            <button className="px-4 py-2 bg-cyan-900 rounded-md text-white font-medium text-md">
              ADD
            </button>
          </div>
        </form>
        <div className="py-4 w-full">
          <ul className="flex flex-col items-center justify-start gap-8 list-none min-w-full min-h-[40vh]">
            <li
              className="w-full py-2 px-4 rounded-md bg-gradient-to-r from-gray-100 to-cyan-100
"
            >
              hello
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
