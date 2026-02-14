import Daily from "../models/daily.model.js";

// ADD NEW DAILY TASK IN DB
export const addDailyTasks = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const newTask = await Daily.create({
      title,
      description,
      dueDate,
      priority,
    });

    res
      .status(200)
      .json({ success: true, message: "task added in db", data: newTask });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "failed to add task", error });
  }
};

// UPDATE TASK
export const updateDailyTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Daily.findByIdAndUpdate(
      id,
      req.body,            // fields to update
      { new: true }        // return updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({data:updatedTask});
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

//DAILY TASKS COMPLETE TOGGLE
export const toggleComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;
    const updatedTask = await Daily.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );
    res.status(200).json({success: true, message: "Successfully task completion status updated",updatedTask});
  } catch (error) {
    res.status(500).json({ message: "Failed to update task completion status", error });
  }
}  

//GET ALL DAILY TASKS FROM DB
export const getDailyTasks = async (req, res) => {
  try {
    const tasks = await Daily.find({});
    res.status(200).json({success: true, message: "got all daily tasks from db", data: tasks})
    
  } catch (error) {
    res.status(200).json({success: false, message: "failed to retrieve tasks", error})
  }
}
