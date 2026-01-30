import React, { useState } from "react";
import { MdDelete, MdClose, MdEdit } from "react-icons/md";
import { PiTextStrikethroughBold } from "react-icons/pi";

function TaskItem({ task, onToggleComplete, onTaskDelete, onTaskEdit }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* TASK ITEM */}
      <li className="bg-gradient-to-r from-gray-400 to-cyan-200 rounded-md px-4 py-2">
        <div className="flex justify-between items-center border-b pb-2">
          <p
            className={`font-medium cursor-pointer hover:text-blue-700
              ${
                task.isCompleted
                  ? "line-through text-gray-500"
                  : "hover:underline md:no-underline"
              }
            `}
            onClick={() => setIsOpen(true)}
          >
            {task.title}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onToggleComplete(task.id)}
              className={`p-1 rounded ${task.isCompleted ? "bg-red-300" : ""}`}
            >
              <PiTextStrikethroughBold />
            </button>

            {/* EDIT BUTTON  */}
            <button onClick={() => onTaskEdit(task)}>
              <MdEdit
                className="cursor-pointer"
              />
            </button>

            <button type="button" onClick={() => onTaskDelete(task.id)}>
              <MdDelete />
            </button>
          </div>
        </div>

        <div className="flex justify-between text-sm pt-2">
          <p
            className={`font-light truncate max-w-[66%] ${
              task.isCompleted ? "text-gray-400" : ""
            }`}
            onClick={() => setIsOpen(true)}
          >
            {task.description}
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
            <p className="mt-2 text-sm">{task.description}</p>

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
