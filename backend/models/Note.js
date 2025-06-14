const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["note", "highlight", "bookmark"],
    default: "note",
  },
  color: {
    type: String,
    enum: ["yellow", "green", "blue"],
    default: "yellow",
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
noteSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Note", noteSchema);
