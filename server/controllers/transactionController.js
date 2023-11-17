import mongoose from 'mongoose'
import Transaction from '../models/transactionModel.js'

export const getTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.find()
			.populate('categoryId', 'name')
			.populate('tagIds', 'name')
			.sort({ date: -1 })
		res.status(200).json(transactions)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const addTransaction = async (req, res) => {
	const transaction = new Transaction(req.body)
	try {
		const newTransaction = await transaction.save()
		res.status(201).json(newTransaction)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const editTransaction = async (req, res) => {
	const { id: _id } = req.params
	const transaction = req.body
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No transaction with that id')
	const updatedTransaction = await Transaction.findByIdAndUpdate(
		_id,
		{ ...transaction, _id },
		{ new: true }
	)
	res.json(updatedTransaction)
}

export const deleteTransaction = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('No transaction with that id')
	await Transaction.findByIdAndDelete(id)
	res.json({ message: 'Transaction deleted successfully' })
}
