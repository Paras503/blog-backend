const express = require("express");
const {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const protect = require("../middlewares/authMiddleware");
const router = express.Router();

// Public routes
router.get("/", getBlogs);
router.get("/:id", getSingleBlog);

// Protected routes
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
