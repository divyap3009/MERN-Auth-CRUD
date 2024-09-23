import express from "express";
const router = express.Router();
import {
  CreatePost,
  deletePost,
  getSinglePost,
  readPost,
  updatePost,
} from "../controller/PostController.js";

router.post("/create", CreatePost);
router.get("/read", readPost);
router.get("/singlepost/:id", getSinglePost);
router.patch("/update/:id", updatePost)
router.delete("/delete/:id", deletePost);

export default router;
