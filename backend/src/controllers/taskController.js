import Task from "../models/Task.js";

const emitTaskUpdate = (req, event, payload) => {
  const io = req.app.get("io");
  if (io && req.user?._id) {
    io.to(req.user._id.toString()).emit(event, payload);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = { user: req.user._id };

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title || !dueDate) {
      res.status(400);
      throw new Error("Title and due date are required");
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status,
      dueDate
    });

    emitTaskUpdate(req, "task-created", task);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    const { title, description, status, dueDate } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.dueDate = dueDate ?? task.dueDate;

    const updatedTask = await task.save();
    emitTaskUpdate(req, "task-updated", updatedTask);
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    await task.deleteOne();
    emitTaskUpdate(req, "task-deleted", { id: req.params.id });
    res.json({ message: "Task deleted successfully", id: req.params.id });
  } catch (error) {
    next(error);
  }
};
