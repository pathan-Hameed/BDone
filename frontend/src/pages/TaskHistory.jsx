import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { CheckCircle, Circle } from "lucide-react";

const priorityStyles = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

function TaskHistory() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("None");
    const [priority, setPriority] = useState("None");

  useEffect(() => {
    const fetchTasks =  async () => {
      try {
        const query = new URLSearchParams({
          category,
          status,
          priority,
        }).toString();

        const res = await fetch(`http://localhost:5000/api/tasks?${query}`);

        const data = await res.json();
        setLoading(false)
        setTasks(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchTasks();
  }, []);

  /* GROUP TASKS BY DATE */
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!task.createdAt) return acc; 

    const date = new Date(task.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});

  /* SORT DATES (LATEST FIRST) */
  const sortedDates = Object.keys(groupedTasks).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-12 py-12">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Task History</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track everything you’ve worked on
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-400 mt-24">
          Loading history...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && tasks.length === 0 && (
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
              <SlCalender className="text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-700">{date}</h2>
            </div>

            {/* TASKS */}
            <div className="flex flex-col gap-3">
              {groupedTasks[date].map((task) => (
                <div
                  key={task._id}
                  className={`p-4 rounded-xl border bg-white shadow-sm flex justify-between items-start transition hover:shadow-md ${
                    task.isCompleted
                      ? "border-green-200 bg-green-50/50"
                      : "border-gray-200"
                  }`}
                >
                  {/* LEFT */}
                  <div className="flex gap-3 justify-between">
                    {task.isCompleted ? (
                      <CheckCircle size={18} className="text-green-600 mt-1 min-w-4" />
                    ) : (
                      <Circle size={18} className="text-gray-400 mt-1 min-w-2" />
                    )}

                    <div>
                      <h3
                        className={`font-medium ${
                          task.isCompleted
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