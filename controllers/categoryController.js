import CategoryModel from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

// post Category data

const addCategory = asyncHandler(async (req, res) => {
    const categoryData = new CategoryModel({
        admin_id: req.body.admin_id,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    });
    try {
        const sData = await categoryData.save();
        res.status(200).json({ message: "Category Added", status: "ok" });
    } catch (err) {
        res.status(500).json(err);
    }
});
// get All Categorys present in database

const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const data = await CategoryModel.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get All Category data base on Owner (user id)

const getCategories = asyncHandler(async (req, res) => {
    const { pageNo, records, admin_id } = req.query;
    try {
        const data = await CategoryModel.find() //CategoryModel.find({ admin_id })
            .limit(records * 1)
            .skip((pageNo - 1) * records)
            .exec();

        // get total documents number in this collection
        const count = await CategoryModel.countDocuments();

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

// get All Category Dropdown data base on Owner (user id)

const getCategoriesDropdown = asyncHandler(async (req, res) => {
    try {
        const data = await CategoryModel.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get edit data base on id

const editCategory = asyncHandler(async (req, res) => {
    try {
        const data = await CategoryModel.findOne({ _id: req.query.category_id });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update category data

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const data = await CategoryModel.findOneAndUpdate(
            { _id: req.body._id },
            req.body
        );
        res.status(200).json({ message: "Category Record Updated!", status: "ok" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete category base on id

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const data = await CategoryModel.deleteOne({ _id: req.query.category_id });
        res.status(200).json({ message: "Category Deleted Successfully!" });
    } catch (err) {
        res.status(500).json(err);
    }
});

export {
    addCategory,
    getCategories,
    editCategory,
    updateCategory,
    deleteCategory,
    getCategoriesDropdown,
};

