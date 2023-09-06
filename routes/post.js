const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  getDetail,
  deletePost,
  getUpdate,
} = require("../controllers/post.js");

router.get("/getPosts", getPosts);
router.post("/createPost", createPost);
router.get("/getDetail/:id", getDetail);
router.delete("/deletePost/:id", deletePost);
router.get("/getUpdate/:id", getUpdate);

module.exports = router;
