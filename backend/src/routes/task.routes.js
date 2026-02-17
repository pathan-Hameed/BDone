// tasks routes are defined here
import express from 'express';
import { addTask, getTasks, updateTask, completedTasks, deleteTask, deleteAll } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/tasks', addTask);
router.put('/tasks/:id', updateTask);
router.patch('/tasks/:id/toggle', completedTasks);
router.get('/tasks', getTasks);
// router.get('/tasks/:id', getTaskById);
router.delete('/tasks/:id/delete', deleteTask);
//delete all
router.delete('/tasks', deleteAll)

export default router;