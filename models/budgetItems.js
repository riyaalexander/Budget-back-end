const { v4: uuidv4 } = require('uuid');

module.exports = [
  {
    id: uuidv4(),
    itemName: 'dog',
    amount: 10000,
    date: '1/2/22',
    from: 'boss',
    category: 'dog',
  }
];
