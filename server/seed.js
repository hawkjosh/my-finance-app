import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Transaction from './models/transactionModel.js'
import Category from './models/categoryModel.js'
import Tag from './models/tagModel.js'
import transactionData from './seeds/transactionSeeds.js'
import categoryData from './seeds/categorySeeds.js'
import tagData from './seeds/tagSeeds.js'

dotenv.config()

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err))

const seedDB = async () => {
	await Transaction.deleteMany({})
	await Category.deleteMany({})
	await Tag.deleteMany({})

	await Transaction.insertMany(transactionData)
	await Category.insertMany(categoryData)
	await Tag.insertMany(tagData)
}

seedDB().then(() => {
	mongoose.connection.close()
})
