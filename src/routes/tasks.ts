import express, { Request, Response } from "express";
import { Task } from "../models/Task";
import { authenticate } from "../middleware/auth";

const router = express.Router();

let tasks: Task[] = [];

// @route   GET /tasks
// @desc    Get all tasks
router.get("/", authenticate, (req: Request, res: Response) => {
  const userTask = tasks.filter((task) => task.userId === req.user?.id);
  console.log("userTask", userTask);
  res.json(userTask);
});

// @route   GET /tasks/:id
// @desc    Get task by id
router.get("/:id", authenticate, (req: Request, res: Response) => {
  const { id } = req.params;

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  const task = tasks.find(
    (task) => task.id === parseInt(id) && task.userId === userId
  );

  if (!task) {
    return res.status(404).json({ msg: "Task not found" });
  }

  console.log("userTask:", task);
  res.json(task);
});

// @route   POST /tasks
// @desc    Create a new task authenticate
router.post("/", authenticate, (req: Request, res: Response) => {
  const { title, description, dueDate, priority } = req.body;

  const newTask: Task = {
    id: tasks.length + 1,
    userId: req.user!.id, //  Number(
    title,
    description,
    dueDate: dueDate ? new Date(dueDate) : undefined,
    priority,
    status: "pending",
  };

  tasks.push(newTask);
  res.json(tasks.filter((task) => task.userId === req.user?.id));
});

// @route   PUT /tasks/:id
// @desc    Update a task authenticate
router.put("/:id", authenticate, (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ msg: "Task not found" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title ? title : tasks[taskIndex].title,
    description: description ? description : tasks[taskIndex].description,
    dueDate: dueDate ? new Date(dueDate) : tasks[taskIndex].dueDate,
    priority: priority ? priority : tasks[taskIndex].priority,
    status: status ? status : tasks[taskIndex].status,
  };

  res.json(tasks[taskIndex]);
});

// @route   DELETE /tasks/:id
// @desc    Delete a task authenticate
router.delete("/:id", authenticate, (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  console.log("delete id:", id);
  console.log("delete userId:", userId);

  const taskIndex = tasks.findIndex(
    (task) => task.id === parseInt(id) && task.userId === userId
  );

  if (taskIndex === -1) {
    return res.status(404).json({ msg: "Task not found" });
  }

  if (tasks[taskIndex].userId !== req.user!.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.json({ msg: "Task removed" });
});

export default router;
