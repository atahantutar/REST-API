const PostSchema = require("../models/post");

const getPosts = async (req, res) => {
  try {
    const post = await PostSchema.findMany();
    res.status(200).json({
      post,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { name, description, stock } = req.body;
    if (!name) {
      return res.status(404).json({ message: "Name cannot be empty" });
    }
    if (!description) {
      return res.status(404).json({ message: "Description cannot be empty" });
    }
    if (!stock) {
      return res.status(404).json({ message: "Stock cannot be empty" });
    }
    const newPost = await PostSchema.create({ name, description, stock });
    res.status(200).json({
      newPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detailPost = await PostSchema.findById(id);
    res.status(200).json({ detailPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = PostSchema.findByIdAndRemove(id);
    res.status(201).json({
      message: "Deletion successful",
    });
  } catch (err) {
    return res.status(500).json({ message: error.message });
  }
};

const getUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = PostSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      updatePost,
    });
  } catch (err) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { deletePost, createPost, getDetail, getPosts, getUpdate };
