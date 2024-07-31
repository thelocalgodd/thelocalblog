const express = require("express");
const {
  createNewPost,
  getAllPosts,
  updatePost,
  getPost,
  deletePost,
} = require("../controllers/postsController");
const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/post/:id", getPost);
router.post("/post", createNewPost);
router.put("/posts/update/:id", updatePost);
router.delete("/posts/delete/:id", deletePost);

module.exports = router;
