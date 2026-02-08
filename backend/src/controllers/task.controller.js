// task adding , deleting and updating logic is done here
import Task from "../models/task.model.js";

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

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,            // fields to update
      { new: true }        // return updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

// get today's tasks from the database and send it to the frontend
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
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(201).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve tasks", error });
  }
};
