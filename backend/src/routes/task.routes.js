// tasks routes are defined here
import express from 'express';
import { addTask, getTasks } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/tasks', addTask);
router.get('/tasks', getTasks);
// router.get('/tasks/:id', getTaskById);
// router.put('/tasks/:id', updateTask);
// router.delete('/tasks/:id', deleteTask);

export default router;