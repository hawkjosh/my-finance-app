import express from 'express'
import {
	getTransactions,
	addTransaction,
	editTransaction,
	deleteTransaction,
} from '../controllers/transactionController.js'
import { getCategories } from '../controllers/categoryController.js'
import { getTags } from '../controllers/tagController.js'

const router = express.Router()

router.get('/', getTransactions)
router.get('/', getCategories)
router.get('/', getTags)
router.post('/', addTransaction)
router.put('/:id', editTransaction)
router.delete('/:id', deleteTransaction)

export default router
