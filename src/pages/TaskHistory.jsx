import React from "react";
import { SlCalender } from "react-icons/sl";
import { CheckCircle, Circle } from "lucide-react";

function TaskHistory({ tasks }) {
  // Group tasks by date
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!task.createdAt) return acc;

    const dateKey = new Date(task.createdAt).toDateString();
    acc[dateKey] = acc[dateKey] || [];
    acc[dateKey].push(task);

    return acc;
  }, {});

  const sortedDates = Object.keys(groupedTasks).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="min-h-screen px-4 md:px-12 py-12 bg-gray-50">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Task History</h1>
        <p className="text-gray-500 text-sm mt-1">
          All tasks grouped by creation date
        </p>
      </div>

      {/* EMPTY STATE */}
      {tasks.length === 0 && (
        <div className="text-center text-gray-400 mt-24">
          No tasks in history yet
        </div>
      )}

      {/* HISTORY LIST */}
      <div className="flex flex-col gap-10">
        {sortedDates.map((date) => (
          <div key={date}>
            {/* DATE HEADER */}
            <div className="flex items-center gap-2 mb-4">
              <SlCalender className="text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-700">{date}</h2>
            </div>

            {/* TASKS */}
            <div className="flex flex-col gap-3">
              {groupedTasks[date].map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border bg-white shadow-sm flex justify-between items-start transition ${
                    task.completed
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  {/* LEFT */}
                  <div className="flex gap-3">
                    {task.completed ? (
                      <CheckCircle className="text-green-600 mt-1" size={18} />
                    ) : (
                      <Circle className="text-gray-400 mt-1" size={18} />
                    )}

                    <div>
                      <h3
                        className={`font-medium ${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>

                      {task.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${priorityStyles(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskHistory;

function priorityStyles(priority) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Low":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
