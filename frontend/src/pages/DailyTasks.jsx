import React, { useEffect, useState } from "react";
import CreateTasks from '../components/CreateTasks.jsx'
import TaskItem from "../components/TaskItem.jsx";

export default function DailyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect( () => {
    const fetchTasks = async () => {
      try {
            const res = await fetch('http://localhost:5000/api/daily')
    const data = await res.json();
    setTasks(data.tasks);
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchTasks();
  }, [])

  const handleSubmit = async (task) => {

    const res = await fetch('http://localhost:5000/api/daily', {
      method: 'POST',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(task)
    })

    const data = await res.json();
    setTasks([...tasks, data.data])
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="my-8 md:my-12">
        <div className="mb-6 md:mb-12">
          {/* Header */}
          <h1 className="text-3xl text-center font-bold text-gray-800 mb-2">
            Today's Tasks
          </h1>
          <p className="text-center">All your daily tasks would appear in dashboard.</p>
        </div>

        {/* Add Task */}
        <div className="flex justify-center gap-3 mb-6 w-full">
          <CreateTasks onSubmit={handleSubmit}/>
        </div>

        {/* Task List */}
        <div className="space-y-4 max-w-2/3 mx-auto">
          {tasks.map((task) => (
            <TaskItem 
            key={task._id}
            task={task} />
          ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No tasks for today 🎉
          </div>
        )}
      </div>
    </div>
  );
}
