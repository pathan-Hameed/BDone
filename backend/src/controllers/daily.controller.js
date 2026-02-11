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


//GET ALL DAILY TASKS FROM DB
export const getDailyTasks = async (req, res) => {
  try {
    const tasks = await Daily.find({});
    res.status(200).json({success: true, message: "got all daily tasks from db", tasks: tasks})
    
  } catch (error) {
    res.status(200).json({success: false, message: "failed to retrieve tasks", error})
  }
}
