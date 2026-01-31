import { SlCalender } from "react-icons/sl";
import { FiEdit2 } from "react-icons/fi";

function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  return (
    <div
      className={`border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition ${
        task.completed ? "bg-blue-50" : "bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <h3
          className={`text-lg font-semibold ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {task.title}
        </h3>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${priorityStyles(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p
          className={`text-sm mt-2 ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-600"
          }`}
        >
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span className="flex items-center gap-2 text-xs text-gray-500">
          <SlCalender />
          {task.dueDate || "No due date"}
        </span>

        <div className="flex gap-2">
          {/* Complete */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`px-3 py-1 text-xs rounded-md font-medium transition ${
              task.completed
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-xs rounded-md font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition flex items-center gap-1"
          >
            <FiEdit2 size={12} />
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 text-xs rounded-md font-medium bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;

function priorityStyles(priority) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Low":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
