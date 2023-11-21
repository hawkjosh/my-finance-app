import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { apiGet, apiAdd, apiEdit, apiDelete } from '../api/api.js'

export const CardsLayout = () => {
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
		try {
			const response = await apiEdit(
				`transactions/${currentTransaction.id}`,
				currentTransaction
			)
			setTransactions(
				transactions.map((transaction) =>
					transaction.id === currentTransaction.id ? response : transaction
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
				transactions.filter((transaction) => transaction.id !== id)
			)
		} catch (error) {
			console.error('Failed to delete transaction:', error)
		}
	}

	useEffect(() => {
		const loadTransactions = async () => {
			try {
				const response = await apiGet('transactions')
				setTransactions(response)
			} catch (error) {
				console.error('Failed to fetch transactions:', error)
			}
		}
		loadTransactions()
	}, [handleAddTransaction, handleEditTransaction, handleDeleteTransaction])

	useEffect(() => {
		const loadCategoriesAndTags = async () => {
			try {
				const categoriesResponse = await apiGet('categories')
				const tagsResponse = await apiGet('tags')
				setCategories(categoriesResponse)
				setTags(tagsResponse)
			} catch (error) {
				console.error('Failed to fetch categories:', error)
			}
		}
		loadCategoriesAndTags()
	}, [])

	return (
		<Main>
			<Title>My Finance App</Title>
			<form onSubmit={handleAddTransaction}>
				<label htmlFor='date'>Date</label>
				<input
					type='date'
					name='date'
					id='date'
					value={newTransaction.date || ''}
					onChange={handleInputChange}
				/>
				<label htmlFor='type'>Type</label>
				<select
					name='type'
					id='type'
					value={newTransaction.type || ''}
					onChange={handleInputChange}>
					<option value=''>Select a type</option>
					<option value='Debit'>Debit</option>
					<option value='Credit'>Credit</option>
				</select>
				<label htmlFor='description'>Description</label>
				<input
					type='text'
					name='description'
					id='description'
					value={newTransaction.description || ''}
					onChange={handleInputChange}
				/>
				<label htmlFor='amount'>Amount</label>
				<input
					type='number'
					name='amount'
					id='amount'
					value={newTransaction.amount || ''}
					onChange={handleInputChange}
					min='0'
				/>
				<label htmlFor='categoryId'>Category</label>
				<select
					name='categoryId'
					id='categoryId'
					value={newTransaction.categoryId || ''}
					onChange={handleInputChange}>
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
					name='tagIds'
					id='tagIds'
					value={newTransaction.tagIds || ''}
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
				<button type='submit'>Add Transaction</button>
			</form>
			
			<TransactionList>
				{transactions.map((transaction) => (
					<TransactionItem key={transaction._id}>
						<TransactionDetail>
							<TransactionDetailLabel>Date</TransactionDetailLabel>
							<TransactionDetailContent>
								{new Date(transaction.date).toLocaleDateString()}
							</TransactionDetailContent>
						</TransactionDetail>
						<TransactionDetail>
							<TransactionDetailLabel>Type</TransactionDetailLabel>
							<TransactionDetailContent>
								{transaction.type}
							</TransactionDetailContent>
						</TransactionDetail>
						<TransactionDetail>
							<TransactionDetailLabel>Description</TransactionDetailLabel>
							<TransactionDetailContent>
								{transaction.description}
							</TransactionDetailContent>
							<TransactionDescriptionTooltip>
								{transaction.description}
							</TransactionDescriptionTooltip>
						</TransactionDetail>
						<TransactionDetail>
							<TransactionDetailLabel>Amount</TransactionDetailLabel>
							<TransactionDetailContent>
								${transaction.amount}
							</TransactionDetailContent>
						</TransactionDetail>
						<TransactionDetail>
							<TransactionDetailLabel>Category</TransactionDetailLabel>
							<TransactionDetailContent>
								{transaction.categoryId?.name}
							</TransactionDetailContent>
						</TransactionDetail>
						<TransactionDetail>
							<TransactionDetailLabel>Tags</TransactionDetailLabel>
							<TransactionDetailContent>
								{transaction.tagIds?.map((tag) => tag.name).join(', ')}
							</TransactionDetailContent>
						</TransactionDetail>
						<button onClick={() => setCurrentTransaction(transaction)}>
							Edit
						</button>
						<button onClick={() => handleDeleteTransaction(transaction._id)}>
							Delete
						</button>
					</TransactionItem>
				))}
			</TransactionList>
		</Main>
	)
}

const Main = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`

const Title = styled.div`
	font-size: 2rem;
	font-weight: 700;
	text-align: center;
	text-transform: uppercase;
`

const TransactionList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
	gap: 0.75rem;
`

const TransactionItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	border: 0.0625rem solid hsl(165, 100%, 35%);
	border-radius: 0.5rem;
	padding: 0.625rem;
`

const TransactionDetailLabel = styled.div`
	font-weight: 700;
	text-decoration: underline;
	text-underline-offset: 0.125rem;
`

const TransactionDetailContent = styled.div`
	font-weight: 500;
	color: hsl(165, 100%, 35%);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	cursor: default;
`

const TransactionDescriptionTooltip = styled.div`
	position: absolute;
	top: calc(100% + 0.5rem);
	left: 1.75rem;
	visibility: hidden;
	color: transparent;
	background: transparent;
	font-weight: 500;
	width: max-content;
	padding: 0.25rem 0.5rem;
	border-radius: 0.25rem;
	transition-property: visibility, color, background, width, padding;
	transition-duration: 300ms;
	transition-timing-function: ease-in-out;
	z-index: 10;
	&:before {
		content: '';
		left: 1.75rem;
		top: -0.5rem;
		position: absolute;
		border: 0.5rem solid transparent;
		transform: rotate(135deg);
		transition: border 300ms ease-in-out;
	}
`

const TransactionDetail = styled.div`
	position: relative;
	display: flex;
	gap: 0.5rem;
	color: hsl(0, 0%, 85%);
	& ${TransactionDetailContent}:hover + ${TransactionDescriptionTooltip} {
		visibility: visible;
		color: hsl(0, 0%, 85%);
		background: hsla(0, 0%, 0%, 0.8);
		&:before {
			border-color: transparent transparent hsla(0, 0%, 0%, 0.8)
				hsla(0, 0%, 0%, 0.8);
		}
	}
`