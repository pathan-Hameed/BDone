import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import CreateTasks from "../components/CreateTasks";

function Home({ dailyTasks, setDailyTasks, homeTasks, setHomeTasks }) {
  const [editingTask, setEditingTask] = useState(null);

  const handleSubmit = (task) => {
    if (editingTask) {
      setHomeTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
      setEditingTask(null);
    } else {
      setHomeTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    }
  };

  const handleOnEdit = (task) => {
    setEditingTask(task);
  };

  const toggleDailyTask = (id) => {
  setDailyTasks((prev) =>
    prev.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    )
  );
};

const toggleHomeTask = (id) => {
  setHomeTasks((prev) =>
    prev.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    )
  );
  setDailyTasks((prev) =>
    prev.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    )
  );
};

  const handleDelete = (id) => {
    setHomeTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setDailyTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleClearAllTasks = () => {
    setHomeTasks([]);
    setDailyTasks([]);
  };

  const completedTasks = homeTasks.filter((t) => t.isCompleted).length + dailyTasks.filter((t) => t.isCompleted).length;
  const totalTasks = homeTasks.length + dailyTasks.length;

  return (
    <div className="w-full h-auto flex justify-center items-start md:items-center px-4 md:px-8 py-8 md:py-12">
      <div className="flex flex-col items-center gap-10 w-full md:w-[50%]">
        <h1 className="font-bold text-3xl text-cyan-900">Task Manager</h1>

        {/* FORM */}
        <CreateTasks
          mode={editingTask ? "edit" : "create"}
          initialValues={editingTask}
          onSubmit={handleSubmit}
        />

        {/* TASK LIST */}
        <div className="p-4 w-full bg-[#f9fbff] rounded-md shadow-[0_8px_24px_rgba(59,130,246,0.12)]">
          <div className="w-full flex items-start justify-between">
            <p className="text-sm mb-2">
              <span className="font-semibold">{completedTasks}/{totalTasks}</span> completed
            </p>
            <button
              className="text-sm font-medium text-blue-700 underline hover:text-blue-400 active:text-black"
              onClick={handleClearAllTasks}
            >
              Clear all
            </button>
          </div>

          <ul className="flex flex-col gap-4 max-h-[40vh] overflow-y-scroll no-scrollbar my-4 md:my-8">
            {[...dailyTasks].reverse().map((task) => (
              <TaskItem
                key={`daily-${task.id}`}
                task={task}
                onToggleComplete={toggleDailyTask}
                onTaskDelete={handleDelete}
                onTaskEdit={handleOnEdit}
              />
            ))}
            {[...homeTasks].reverse().map((task) => (
              <TaskItem
                key={`home-${task.id}`}
                task={task}
                onToggleComplete={toggleHomeTask}
                onTaskDelete={handleDelete}
                onTaskEdit={handleOnEdit}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;