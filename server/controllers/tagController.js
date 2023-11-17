import mongoose from 'mongoose'
import Tag from '../models/tagModel.js'

export const getTags = async (req, res) => {
	try {
		const tags = await Tag.find()
		res.status(200).json(tags)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const addTag = async (req, res) => {
	const tag = new Tag(req.body)
	try {
		const newTag = await tag.save()
		res.status(201).json(newTag)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const editTag = async (req, res) => {
	const { id: _id } = req.params
	const tag = req.body
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No tag with that id')
	const updatedTag = await Tag.findByIdAndUpdate(
		_id,
		{ ...tag, _id },
		{ new: true }
	)
	res.json(updatedTag)
}

export const deleteTag = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('No tag with that id')
	await Tag.findByIdAndRemove(id)
	res.json({ message: 'Tag deleted successfully' })
}
