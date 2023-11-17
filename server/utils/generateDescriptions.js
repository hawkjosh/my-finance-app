function generateDescriptions(count) {
  const transactionWords = ["Purchase", "Payment", "Deposit", "Withdrawal", "Transfer", "Expense", "Income", "Refund"];
  const categories = ["Groceries", "Shopping", "Utilities", "Entertainment", "Travel", "Healthcare", "Salary", "Rent"];
  
  const descriptions = [];
  
  for (let i = 0; i < count; i++) {
    const randomWord = transactionWords[Math.floor(Math.random() * transactionWords.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const amount = (Math.random() * 1000).toFixed(2); // Random amount between 0 and 1000
    
    const description = `${randomWord} from ${randomCategory} - $${amount}`;
    descriptions.push(description);
  }
  
  return descriptions;
}

// Example usage to generate 5 random transaction descriptions:
const randomDescriptions = generateDescriptions(5);
console.log(randomDescriptions);

function generateRandomTransactionData(count) {
  const transactionWords = ["Purchase", "Payment", "Deposit", "Withdrawal", "Transfer", "Expense", "Income", "Refund"];
  const categories = ["Groceries", "Shopping", "Utilities", "Entertainment", "Travel", "Healthcare", "Salary", "Rent"];
  
  const descriptions = [];
  
  for (let i = 0; i < count; i++) {
    const randomWord = transactionWords[Math.floor(Math.random() * transactionWords.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const amount = (Math.random() * 1000).toFixed(2); // Random amount between 0 and 1000
    
    // Generate a random date within the last year
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000));
    
    const description = {
      date: randomDate.toISOString().slice(0, 10),
      category: randomCategory,
      description: `${randomWord} - $${amount}`
    };
    
    descriptions.push(description);
  }
  
  return descriptions;
}

// Example usage to generate 5 random transaction data:
const randomTransactionData = generateRandomTransactionData(5);
console.log(randomTransactionData);

