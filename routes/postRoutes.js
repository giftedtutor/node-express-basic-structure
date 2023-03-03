import express from "express";
import {
    addPost,
    getPosts,
    editPost,
    updatePost,
    deletePost

} from "../controllers/postController.js";
const router = express.Router();

// post table routes

router.post("/addPost", addPost);
router.get("/getPosts", getPosts);

router.get("/editPost", editPost);
router.put("/updatePost", updatePost);
router.delete("/deletePost", deletePost);

export default router;
