const Blog = require("../models/blogModel");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "Title and content required" });

  const blog = await Blog.create({
    title,
    content,
    author: req.user._id, // from JWT middleware
  });

  res.status(201).json(blog);
};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json(blogs);
};

// GET SINGLE BLOG
exports.getSingleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate("author", "name email");

  if (!blog) return res.status(404).json({ error: "Blog not found" });
  res.status(200).json(blog);
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: "Blog not found" });
  if (blog.author.toString() !== req.user._id.toString())
    return res.status(403).json({ error: "Not authorized" });

  blog.title = req.body.title || blog.title;
  blog.content = req.body.content || blog.content;

  const updatedBlog = await blog.save();
  res.status(200).json(updatedBlog);
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: "Blog not found" });
  if (blog.author.toString() !== req.user._id.toString())
    return res.status(403).json({ error: "Not authorized" });

  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};
