const Post = require("../models/post.model");
const crypto = require("crypto");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts) {
      return res.status(404).json({ error: "no posts found" });
    }

    res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createNewPost = async (req, res) => {
  try {
    const privateKey = crypto.randomBytes(4).toString("hex");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      privateKey,
    });
    await post.save();
    res.status(201).json({ id: post._id, privateKey });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({
      title: post.title,
      content: post.content,
      date: post.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.privateKey !== req.body.privateKey) {
      return res.status(403).json({ message: "Invalid private key" });
    }
    post.content = req.body.content;
    await post.save();
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
};
