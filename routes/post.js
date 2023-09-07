const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  getDetail,
  deletePost,
  getUpdate,
  searchPost,
} = require("../controllers/post.js");
const auth = require("../middleware/auth.js");

router.get("/searchPost", searchPost);
router.get("/getPosts", getPosts);
router.post("/createPost", auth, createPost);
router.get("/getDetail/:id", getDetail);
router.delete("/deletePost/:id", auth, deletePost);
router.get("/getUpdate/:id", auth, getUpdate);

module.exports = router;
