import React, { useState } from "react";
import { MdDelete, MdClose } from "react-icons/md";
import { PiTextStrikethroughBold } from "react-icons/pi";

function TaskItem({ task, onStrike, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* TASK ITEM */}
      <li className="bg-gradient-to-r from-gray-100 to-cyan-200 rounded-md px-4 py-2">
        <div className="flex justify-between items-center border-b pb-2">
          <p
            className={`font-medium underline md:no-underline cursor-pointer hover:text-blue-700 ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
            onClick={() => setIsOpen(true)}
          >
            {task.title}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onStrike(task.id)}
              className={`p-1 rounded ${task.completed ? "bg-red-300" : ""}`}
            >
              <PiTextStrikethroughBold />
            </button>

            <button type="button" onClick={() => onDelete(task.id)}>
              <MdDelete />
            </button>
          </div>
        </div>

        <div className="flex justify-between text-sm pt-2">
          <p
            className={`font-light truncate max-w-[66%] ${
              task.completed ? "text-gray-400" : ""
            }`}
            onClick={() => setIsOpen(true)}
          >
            {task.desc}
          </p>

          <div className="flex items-center gap-2 text-xs">
            <span>{task.date}</span>
            <span>{task.time}</span>
          </div>
        </div>
      </li>

      {/* MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white text-black p-6 rounded-lg w-[90%] md:w-[400px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              <MdClose size={20} />
            </button>

            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="mt-2 text-sm">{task.desc}</p>

            <div className="mt-4 text-xs text-gray-500 flex gap-4">
              <span>{task.date}</span>
              <span>{task.time}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskItem;
