const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Note = require("../models/Note");
const auth = require("../middleware/auth");

// @route   GET api/notes
// @desc    Get all notes for a user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
      .populate("book", ["title", "author"])
      .sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/notes
// @desc    Create a note
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("content", "Content is required").not().isEmpty(),
      check("book", "Book ID is required").not().isEmpty(),
      check("pageNumber", "Page number is required").isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newNote = new Note({
        user: req.user.id,
        book: req.body.book,
        content: req.body.content,
        pageNumber: req.body.pageNumber,
        type: req.body.type,
        color: req.body.color,
        tags: req.body.tags,
      });

      const note = await newNote.save();
      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/notes/:id
// @desc    Update a note
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    // Check user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    // Check user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await note.remove();
    res.json({ msg: "Note removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
