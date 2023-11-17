import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
	date: Date,
	type: { type: String, enum: ['Debit', 'Credit'], required: true },
	description: String,
	amount: Number,
	categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
	tagIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
})

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction
