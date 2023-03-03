import PostModel from "../models/postModel.js";
import asyncHandler from "express-async-handler";

// post Post data

const addPost = asyncHandler(async (req, res) => {
    const postData = new PostModel({
        user_id: req.body.user_id,
        title: req.body.title,
        body: req.body.body
    });
    try {
        const sData = await postData.save();
        res.status(200).json({ message: "Post Added", status: "ok" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get All Post data base on Owner (user id)

const getPosts = asyncHandler(async (req, res) => {
    const { pageNo, records, user_id } = req.query;
    try {
        const data = await PostModel.find() //PostModel.find({ user_id })
            .limit(records * 1)
            .skip((pageNo - 1) * records)
            .exec();

        // get total documents number in this collection
        const count = await PostModel.countDocuments();

        // return response with posts, total pages, and current page
        res.status(200).json({
            data,
            totalPages: Math.ceil(count / records),
            currentPage: pageNo,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// get edit data base on id

const editPost = asyncHandler(async (req, res) => {
    try {
        const data = await PostModel.findOne({ _id: req.query.post_id });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update post data

const updatePost = asyncHandler(async (req, res) => {
    try {
        const data = await PostModel.findOneAndUpdate(
            { _id: req.body._id },
            req.body
        );
        res.status(200).json({ message: "Post Record Updated!", status: "ok" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete post base on id

const deletePost = asyncHandler(async (req, res) => {
    try {
        const data = await PostModel.deleteOne({ _id: req.query.post_id });
        res.status(200).json({ message: "Post Deleted Successfully!" });
    } catch (err) {
        res.status(500).json(err);
    }
});

export {
    addPost,
    getPosts,
    editPost,
    updatePost,
    deletePost
};

