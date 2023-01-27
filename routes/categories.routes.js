const { Router } = require("express")
const { findCategories, findCategory, createCategory, updateCategory, deleteCategory } = require("../controllers/categories.controller")

const router = Router()

router.get('/', findCategories)

router.get('/:id', findCategory)

router.post('/', createCategory)

router.patch('/:id', updateCategory)

router.delete('/:id', deleteCategory)

module.exports = {
    categorieRouter: router
}