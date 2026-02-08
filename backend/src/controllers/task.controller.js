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
