import express from 'express'
import cors from 'cors'
import transactionRoutes from './routes/transactionRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import tagRoutes from './routes/tagRoutes.js'
import dotenv from 'dotenv'
import './db.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/transactions', transactionRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/tags', tagRoutes)

app.get('/', (req, res) => {
	res.send('Hello from the backend!')
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
