const express = require("express");
const router = express.Router();
const {create , categoryById , read, allCategory, deleteCategory, updateCategory} = require("../controller/category.controller");

router.post("/create/:userId",create);
router.get("/:categoryId", read);
router.put("/:categoryId/:userId",updateCategory);
router.delete("/:categoryId/:userId", deleteCategory);
router.get("/", allCategory);

router.param("categoryId", categoryById);

module.exports = router