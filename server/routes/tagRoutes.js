import express from 'express'
import {
	getTags,
	addTag,
	editTag,
	deleteTag,
} from '../controllers/tagController.js'

const router = express.Router()

router.get('/', getTags)
router.post('/', addTag)
router.put('/:id', editTag)
router.delete('/:id', deleteTag)

export default router
