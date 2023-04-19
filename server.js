const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let transactions = [
  {
    id: 1,
    item_name: 'Salary',
    amount: 5000,
    date: '2023-04-15',
    from: 'Employer',
    category: 'income'
  },
  {
    id: 2,
    item_name: 'Rent',
    amount: 1500,
    date: '2023-04-01',
    from: 'Landlord',
    category: 'housing'
  },
  {
    id: 3,
    item_name: 'Groceries',
    amount: 100,
    date: '2023-04-10',
    from: 'Grocery Store',
    category: 'food'
  }
];

// Index
app.get('/transactions', (req, res) => {
  res.json(transactions);
});

// Show single resource
app.get('/transactions/:id', (req, res) => {
  const id = Number(req.params.id);
  const transaction = transactions.find(transaction => transaction.id === id);
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

// Create a new resource
app.post('/transactions', (req, res) => {
  const { item_name, amount, date, from, category } = req.body;
  const id = transactions.length + 1;
  const newTransaction = {
    id,
    item_name,
    amount,
    date,
    from,
    category
  };
  transactions.push(newTransaction);
  res.json(newTransaction);
});

// Update a single resource
app.put('/transactions/:id', (req, res) => {
  const id = Number(req.params.id);
  const transactionIndex = transactions.findIndex(transaction => transaction.id === id);
  if (transactionIndex !== -1) {
    const { item_name, amount, date, from, category } = req.body;
    transactions[transactionIndex] = {
      id,
      item_name,
      amount,
      date,
      from,
      category
    };
    res.json(transactions[transactionIndex]);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

// Delete a single resource
app.delete('/transactions/:id', (req, res) => {
  const id = Number(req.params.id);
  const transactionIndex = transactions.findIndex(transaction => transaction.id === id);
  if (transactionIndex !== -1) {
    const deletedTransaction = transactions.splice(transactionIndex, 1);
    res.json(deletedTransaction[0]);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

// Not Found 
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
