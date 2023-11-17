const transactionData = [
	{
		date: new Date('2023-10-01'),
		type: 'Debit',
		description: 'Grocery shopping at Store X',
		amount: 120.50,
		categoryId: '5f8a1d5b8b0b2b1b2c9b3b0a',
		tagIds: ['65550ee8de699c8d1bd37951', '65550ee8de699c8d1bd37953'],
	},
	{
		date: new Date('2023-10-05'),
		type: 'Credit',
		description: 'Paycheck from Company Y',
		amount: 2500.00,
		categoryId: '5f8a1d5b8b0b2b1b2c9b3b0b',
		tagIds: ['65550ee8de699c8d1bd37952'],
	},
	{
		date: new Date('2023-10-15'),
		type: 'Debit',
		description: 'Coffee at Cafe Z',
		amount: 5.75,
		categoryId: '5f8a1d5b8b0b2b1b2c9b3b0c',
		tagIds: ['65550ee8de699c8d1bd37954'],
	},
	{
		date: new Date('2023-10-20'),
		type: 'Debit',
		description: 'Gasoline purchase',
		amount: 65.00,
		categoryId: '5f8a1d5b8b0b2b1b2c9b3b0d',
		tagIds: ['65550ee8de699c8d1bd37955'],
	},
	{
		date: new Date('2023-11-01'),
		type: 'Debit',
		description: 'Monthly Netflix subscription',
		amount: 15.99,
		categoryId: '5f8a1d5b8b0b2b1b2c9b3b0e',
		tagIds: ['65550ee8de699c8d1bd37956'],
	},
	{
		date: new Date('2023-11-03'),
		type: 'Debit',
		description: 'Dinner at Italian Restaurant',
		amount: 85.20,
		categoryId: '5f8a1d5b8b0b2b1b2c9b3b0c',
		tagIds: ['65550ee8de699c8d1bd37954', '65550ee8de699c8d1bd37957'],
	},
	{
		date: new Date('2023-11-10'),
		type: 'Credit',
		description: 'Freelance web development payment',
		amount: 1350.00,
		categoryId: '5f8a1d5b8b0b2b1b2c9b3b0b',
		tagIds: ['65550ee8de699c8d1bd37952', '65550ee8de699c8d1bd37958'],
	},
	{
		date: new Date('2023-11-12'),
		type: 'Debit',
		description: 'Grocery shopping at Supermarket',
		amount: 200.00,
		categoryId: '5f8a1d5b8b0b2b1b2c9b3b0a',
		tagIds: ['65550ee8de699c8d1bd37951', '65550ee8de699c8d1bd37953'],
	},
]

export default transactionData