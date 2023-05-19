const express = require('express');
const { transActionValidator } = require('../models/validators');
const transactionsArray = require('../models/budgetItems');

const transactions = express.Router();

transactions.get('/', (request, response) => {
  console.log('transactionsArray', transactionsArray);
  response.json(transactionsArray);
});

transactions.get('/:index', (request, response) => {
  const { index } = request.params;
  if (transactionsArray[index]) {
    response.json(transactionsArray[index]);
  } else {
    response.redirect("/budget");
  }
});

transactions.post('/', (request, response) => {
  transactionsArray.push(request.body);
  response.json(transactionsArray[transactionsArray.length - 1]);
});

transactions.put('/:index', transActionValidator, (request, response) => {
  const { index } = request.params;
  if (transactionsArray[index]) {
    transactionsArray[index] = request.body;
    response.status(200).json(transactionsArray[index]);
  } else {
    response.status(404).json({ error: 'Not Found' });
  }
});

transactions.delete('/:index', (request, response) => {
  const { index } = request.params;
  if (transactionsArray[index]) {
    const deleteTransAction = transactionsArray.splice(index, 1);
    response.status(200).json(deleteTransAction);
  } else {
    response.status(400).json({ error: 'An error has occurred' });
  }
});

module.exports = transactions;
