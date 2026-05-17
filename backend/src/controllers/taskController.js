const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sort = '-createdAt' } = req.query;

    const filter = { user: req.user._id };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const tasks = await Task.find(filter).sort(sort);

    // Stats
    const stats = {
      total: await Task.countDocuments({ user: req.user._id }),
      todo: await Task.countDocuments({ user: req.user._id, status: 'todo' }),
      inProgress: await Task.countDocuments({ user: req.user._id, status: 'in-progress' }),
      completed: await Task.countDocuments({ user: req.user._id, status: 'completed' }),
    };

    res.json({ tasks, stats });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Create task
// @route   POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { title, description, status, priority, dueDate, tags } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      tags: tags || [],
      user: req.user._id,
    });

    // Emit real-time event
    const io = req.app.get('io');
    if (io) io.to(req.user._id.toString()).emit('task:created', task);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { title, description, status, priority, dueDate, tags } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate || null;
    if (tags !== undefined) task.tags = tags;

    const updated = await task.save();

    // Emit real-time event
    const io = req.app.get('io');
    if (io) io.to(req.user._id.toString()).emit('task:updated', updated);

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Emit real-time event
    const io = req.app.get('io');
    if (io) io.to(req.user._id.toString()).emit('task:deleted', { _id: req.params.id });

    res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task status only (quick toggle)
// @route   PATCH /api/tasks/:id/status
const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['todo', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const io = req.app.get('io');
    if (io) io.to(req.user._id.toString()).emit('task:updated', task);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask, updateTaskStatus };
