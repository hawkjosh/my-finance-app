import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { apiGet, apiAdd, apiEdit, apiDelete } from '../helpers/api.js'

export const TableLayout = () => {
	const [transactions, setTransactions] = useState([])
	const [categories, setCategories] = useState([])
	const [tags, setTags] = useState([])
	const [newTransaction, setNewTransaction] = useState({
		date: '',
		type: '',
		description: '',
		amount: '',
		categoryId: '',
		tagIds: [],
	})
	const [currentTransaction, setCurrentTransaction] = useState(null)

	const handleInputChange = (e) => {
		const { name, value, options } = e.target
		if (name === 'tagIds' && options) {
			const values = Array.from(options)
				.filter((option) => option.selected)
				.map((option) => option.value)
			setNewTransaction({ ...newTransaction, [name]: values })
		} else {
			setNewTransaction({ ...newTransaction, [name]: value })
		}
	}

	const handleAddTransaction = async (e) => {
		e.preventDefault()
		const parsedAmount = parseFloat(newTransaction.amount)
		if (isNaN(parsedAmount)) {
			alert('Please enter a valid amount.')
			return
		}
		const transactionToSend = {
			...newTransaction,
			amount: parsedAmount,
		}
		try {
			const response = await apiAdd('transactions', transactionToSend)
			setTransactions([...transactions, response])
			setNewTransaction({
				date: '',
				type: '',
				description: '',
				amount: '',
				categoryId: '',
				tagIds: [],
			})
		} catch (error) {
			console.error('Failed to add transaction:', error)
		}
	}

	const handleEditTransaction = async (e) => {
		e.preventDefault()
		const parsedAmount = parseFloat(currentTransaction.amount)
		if (isNaN(parsedAmount)) {
			alert('Please enter a valid amount.')
			return
		}
		const transactionToSend = {
			...currentTransaction,
			amount: parsedAmount,
		}
		try {
			const response = await apiEdit(
				'transactions',
				currentTransaction._id,
				transactionToSend
			)
			setTransactions(
				transactions.map((transaction) =>
					transaction._id === currentTransaction._id ? response : transaction
				)
			)
			setCurrentTransaction(null)
		} catch (error) {
			console.error('Failed to edit transaction:', error)
		}
	}

	const handleDeleteTransaction = async (id) => {
		try {
			await apiDelete(`transactions/${id}`)
			setTransactions(
				transactions.filter((transaction) => transaction._id !== id)
			)
			setCurrentTransaction(null)
		} catch (error) {
			console.error('Failed to delete transaction:', error)
		}
	}

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const transactions = await apiGet('transactions')
				setTransactions(transactions)
			} catch (error) {
				console.error('Failed to fetch transactions:', error)
			}
		}
		fetchTransactions()
	}, [handleAddTransaction, handleEditTransaction, handleDeleteTransaction])

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categories = await apiGet('categories')
				setCategories(categories)
			} catch (error) {
				console.error('Failed to fetch categories:', error)
			}
		}
		fetchCategories()
	}, [])

	useEffect(() => {
		const fetchTags = async () => {
			try {
				const tags = await apiGet('tags')
				setTags(tags)
			} catch (error) {
				console.error('Failed to fetch tags:', error)
			}
		}
		fetchTags()
	}, [])

	return (
		<Wrapper>
			<Header>
				<h1>My Finance App</h1>
			</Header>
			<Main>
				<Transactions>
					<h2>Transactions</h2>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Type</th>
								<th>Description</th>
								<th>Amount</th>
								<th>Category</th>
								<th>Tags</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{transactions.map((transaction) => (
								<tr key={transaction._id}>
									<td>{new Date(transaction.date).toLocaleDateString()}</td>
									<td>{transaction.type}</td>
									<td>{transaction.description}</td>
									<td>${transaction.amount.toFixed(2)}</td>
									<td>{transaction.categoryId?.name}</td>
									<td>
										{transaction.tagIds?.map((tag) => tag.name).join(', ')}
									</td>
									<td>
										<button onClick={() => setCurrentTransaction(transaction)}>
											Edit
										</button>
										<button
											onClick={() => handleDeleteTransaction(transaction._id)}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</Transactions>

				<AddTransaction>
					<h2>{currentTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
					<form
						onSubmit={
							currentTransaction ? handleEditTransaction : handleAddTransaction
						}>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							id='date'
							name='date'
							value={
								currentTransaction
									? currentTransaction.date
									: newTransaction.date
							}
							onChange={handleInputChange}
						/>
						<label htmlFor='type'>Type</label>
						<select
							id='type'
							name='type'
							value={
								currentTransaction
									? currentTransaction.type
									: newTransaction.type
							}
							onChange={handleInputChange}>
							<option value=''>Select a type</option>
							<option value='Credit'>Credit</option>
							<option value='Debit'>Debit</option>
						</select>
						<label htmlFor='description'>Description</label>
						<input
							type='text'
							id='description'
							name='description'
							value={
								currentTransaction
									? currentTransaction.description
									: newTransaction.description
							}
							onChange={handleInputChange}
						/>
						<label htmlFor='amount'>Amount</label>
						<input
							type='number'
							id='amount'
							name='amount'
							value={
								currentTransaction
									? currentTransaction.amount
									: newTransaction.amount
							}
							onChange={handleInputChange}
							min='0'
						/>
						<label htmlFor='categoryId'>Category</label>
						<select
							id='categoryId'
							name='categoryId'
							value={
								currentTransaction
									? currentTransaction.categoryId
									: newTransaction.categoryId
							}
							onChange={handleInputChange}>
							<option value=''>Select a category</option>
							{categories.map((category) => (
								<option
									key={category._id}
									value={category._id}>
									{category.name}
								</option>
							))}
						</select>
						<label htmlFor='tagIds'>Tags</label>
						<select
							id='tagIds'
							name='tagIds'
							value={
								currentTransaction
									? currentTransaction.tagIds
									: newTransaction.tagIds
							}
							onChange={handleInputChange}
							multiple>
							{tags.map((tag) => (
								<option
									key={tag._id}
									value={tag._id}>
									{tag.name}
								</option>
							))}
						</select>
						<button type='submit'>
							{currentTransaction ? 'Edit Transaction' : 'Add Transaction'}
						</button>
					</form>
				</AddTransaction>
			</Main>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	font-family: sans-serif;
`

const Header = styled.header`
	background-color: #333;
	color: #fff;
	padding: 1rem;
	text-align: center;
`

const Main = styled.main`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
`

const Transactions = styled.section`
	flex: 1;
	margin-right: 1rem;
	h2 {
		margin-top: 0;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		th,
		td {
			border: 1px solid #fff;
			padding: 0.25rem;
		}
	}
`

const AddTransaction = styled.section`
	flex: 0.25;
	margin-left: 1rem;
	h2 {
		margin-top: 0;
	}
	form {
		display: flex;
		flex-direction: column;
		label {
			margin-top: 0.5rem;
		}
		input,
		select {
			margin-top: 0.25rem;
			padding: 0.5rem;
			border: 1px solid #333;
			border-radius: 0.25rem;
		}
		button {
			margin-top: 1rem;
			padding: 0.5rem;
			border: 1px solid #333;
			border-radius: 0.25rem;
			background-color: #333;
			color: #fff;
			font-size: 1rem;
			cursor: pointer;
		}
	}
`
