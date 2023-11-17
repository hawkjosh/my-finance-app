import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
	name: { type: String, required: true },
	transactionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
})

const Tag = mongoose.model('Tag', tagSchema)

export default Tag
