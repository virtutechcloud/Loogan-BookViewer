const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Book = require("../models/Book");
const auth = require("../middleware/auth");

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().select("-content");
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/books/:id
// @desc    Get book by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/books
// @desc    Create a book
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("author", "Author is required").not().isEmpty(),
      check("content", "Content is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        content: req.body.content,
        tableOfContents: req.body.tableOfContents,
        coverImage: req.body.coverImage,
        category: req.body.category,
        tags: req.body.tags,
      });

      const book = await newBook.save();
      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/books/:id/highlight
// @desc    Add a highlight to a book
// @access  Private
router.put("/:id/highlight", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    const newHighlight = {
      userId: req.user.id,
      content: req.body.content,
      color: req.body.color,
      pageNumber: req.body.pageNumber,
    };

    book.highlights.unshift(newHighlight);
    await book.save();
    res.json(book.highlights);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/books/:id/highlight/:highlight_id
// @desc    Remove highlight from book
// @access  Private
router.delete("/:id/highlight/:highlight_id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    // Get remove index
    const removeIndex = book.highlights
      .map((highlight) => highlight.id)
      .indexOf(req.params.highlight_id);

    if (removeIndex === -1) {
      return res.status(404).json({ msg: "Highlight not found" });
    }

    // Check user
    if (book.highlights[removeIndex].userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    book.highlights.splice(removeIndex, 1);
    await book.save();
    res.json(book.highlights);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
