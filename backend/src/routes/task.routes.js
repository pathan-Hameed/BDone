// tasks routes are defined here
import express from 'express';
import { addTask, getTasks, getTodayTasks, updateTask, completedTasks } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/tasks', addTask);
router.put('/tasks/:id', updateTask);
router.patch('/tasks/:id/toggle', completedTasks);
router.get('/tasks', getTasks);
router.get('/tasks/today', getTodayTasks);
// router.get('/tasks/:id', getTaskById);
// router.delete('/tasks/:id', deleteTask);

export default router;