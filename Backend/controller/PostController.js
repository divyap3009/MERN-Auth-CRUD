import PostModel from "../model/PostModel.js";

const CreatePost = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const existingUser = await PostModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exist" });
    }

    const user = await PostModel.create({
      name,
      email,
      age,
    });
    return res
      .status(201)
      .json({ success: true, msg: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

const readPost = async (req, res) => {
  try {
    const user = await PostModel.find();
    res.status(200).json({ success: true, msg: "All users data", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await PostModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    res.status(200).json({ success: true, msg: "Single user data", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const user = await PostModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    res.status(200).json({ success: true, msg: "Updated user data", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await PostModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, msg: "User deleted successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { CreatePost, readPost, getSinglePost, updatePost, deletePost };
