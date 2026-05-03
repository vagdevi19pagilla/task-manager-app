const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// CREATE
router.post("/", auth, async (req, res) => {
  const task = new Task({
    userId: req.user.id,
    title: req.body.title,
    completed: false
  });

  await task.save();
  res.send(task);
});

// READ
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.send(tasks);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(task);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;