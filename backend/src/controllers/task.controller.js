// task adding , deleting and updating logic is done here
import Task from "../models/task.model.js";

// ADD TASK
export const addTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const newTask = new Task({ title, description, dueDate, priority });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to add task", error });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body, // fields to update
      { new: true }, // return updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

// TOGGLE COMPLETE UPDATE
export const completedTasks = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Toggle logic handled by backend
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task completion status updated successfully",
      updatedTask: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task completion status",
      error,
    });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};

// get today's tasks from the database and send it to the frontend
// GET TODAY'S TASKS
export const getTodayTasks = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch today tasks", error });
  }
};

// get all the tasks from the database and send it to the frontend
// GET ALL TASKS
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(201).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve tasks", error });
  }
};
