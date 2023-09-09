const PostSchema = require("../models/post");

const getPosts = async (req, res) => {
  try {
    const post = await PostSchema.find({});
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
    const existingPost = await PostSchema.findOne({
      name: name,
      description: description,
    });
    if (!name || !description || !stock) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    if (existingPost) {
      return res.status(400).json({ message: "There is such an article." });
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
    await PostSchema.findByIdAndRemove(id);
    res.status(200).json({
      message: "Deletion successful",
    });
  } catch (err) {
    return res.status(500).json({ message: error.message });
  }
};

const getUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      updatePost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  const { search, tag } = req.query;
  try {
    const title = new RegExp(search, "i");
    const searchedPost = await PostSchema.find({
      $or: [{ name: title }],
      description: { $in: tag.split(",") },
    });
    res.status(200).json({
      searchedPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  getDetail,
  deletePost,
  getUpdate,
  searchPost,
};
