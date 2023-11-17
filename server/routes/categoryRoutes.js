import express from 'express'
import {
	getCategories,
	addCategory,
	editCategory,
	deleteCategory,
} from '../controllers/categoryController.js'

const router = express.Router()

router.get('/', getCategories)
router.post('/', addCategory)
router.put('/:id', editCategory)
router.delete('/:id', deleteCategory)

export default router
