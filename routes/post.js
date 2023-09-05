const express = require("express");
const router = express.Router();
const {} = require("../controllers/post.js");

router.get("/createPost", createPost);
router.get("getUpdate/:id", getUpdate);
router.delete("deletePost/:id", deletePost);
router.get("getDetail/:id", getDetail);
router.get("/getPosts", getPosts);

module.exports = router;
