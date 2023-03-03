import express from "express";
import {
    addCategory,
    getCategories,
    editCategory,
    updateCategory,
    deleteCategory,
    getCategoriesDropdown

} from "../controllers/categoryController.js";
const router = express.Router();

// category table routes

router.post("/addCategory", addCategory);
router.get("/getCategories", getCategories);
router.get("/getCategoriesDropdown", getCategoriesDropdown);

router.get("/editCategory", editCategory);
router.put("/updateCategory", updateCategory);
router.delete("/deleteCategory", deleteCategory);

export default router;
