const express = require("express");
const router = express.Router();
const Snippet = require("../models/Snippet");

// SAVE OR UPDATE
router.post("/save", async (req, res) => {
  const { id, title, code } = req.body;

  if (!title || !code) {
    return res.status(400).json({ error: "Title & code required" });
  }

  // ❗ Check duplicate names
  const existing = await Snippet.findOne({ title });

  if (existing && existing._id.toString() !== id) {
    return res.status(400).json({ error: "File name already exists" });
  }

  // ✅ Update existing
  if (id) {
    await Snippet.findByIdAndUpdate(id, { title, code });
    return res.json({ message: "Updated" });
  }

  // ✅ Create new
  const snippet = new Snippet({ title, code });
  await snippet.save();

  res.json({ message: "Saved" });
});

// GET ALL
router.get("/", async (req, res) => {
  const data = await Snippet.find();
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Snippet.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;