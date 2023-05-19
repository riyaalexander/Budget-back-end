const express = require('express');
const budgetItemsController = require('./controllers/transactions.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('This is the home page');
});

app.use('/budget', budgetItemsController);

app.get('*', (request, response) => {
  response.status(404).json({ error: 'Sorry, page not found!' });
});

module.exports = app;
