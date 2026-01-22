import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { PiTextStrikethroughBold } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";

export default function Home() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [desc, setDesc] = useState("");
  const [total, setTotal] = useState(0);
  const [complete, setComplete] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!title.trim()) {
        return;
      }

      setTasks([...tasks, { title, desc }]);
      setTotal(total + 1);
      setTitle("");
      setDesc("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-12 w-full md:w-[50%] lg:w-[50%]">
        <h1 className=".outfit font-bold text-3xl text-center text-cyan-900">
          Task Manager
        </h1>

        {/* Title and Description  */}
        <form
          id="task-input"
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between gap-4">
            <input
              className="text-sm md:text-md border border-gray-200 rounded-md px-2 py-2 w-full outline-none"
              type="text"
              name=""
              id="task-title"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-cyan-900 rounded-md text-white font-medium text-md"
              type="submit"
            >
              ADD
            </button>
          </div>
          <div className="flex items-start justify-between gap-4">
            <textarea
              className="text-sm md:text-md border border-gray-200 rounded-md px-2 py-2 w-full outline-none"
              type="text"
              name=""
              id="task-title"
              placeholder="Enter Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </form>

        <div className="p-4 w-full h-auto relative bg-amber-100">
          <ul
            id="task-list"
            className="flex flex-col items-center justify-start gap-6 list-none min-w-full min-h-[40vh] max-h-[40vh] h-[40vh] border-none overflow-y-scroll no-scrollbar"
          >
            <p className="sticky top-0 left-0 w-full bg-none z-10 text-left text-sm">{complete}/{total}</p>
            {[...tasks].reverse().map((task, index) => (
              <li
                key={index}
                className="text-xl bg-gradient-to-r from-gray-100 to-cyan-200 font-semibold w-full rounded-md px-4 py-2"
              >
                {/* title and delete bttn  */}
                <div className="pb-2 flex justify-between items-center border-b border-b-gray-400">
                  <p className="text-sm md:text-lg font-medium">{task.title}</p>
                  <button type="submit" className="cursor-pointer">
                    <MdDelete title="delete" />
                  </button>
                </div>

                {/* description and other function  */}
                <div className="pt-2 flex justify-between items-center text-sm font-medium">
                  <p>{task.desc}</p>
                  {/* strike and date button  */}
                  <div className="flex items-center gap-4">
                    <button className="cursor-pointer">
                      <PiTextStrikethroughBold title="strike" />
                    </button>
                    <button className="cursor-pointer">
                      <MdDateRange title="date, time" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
