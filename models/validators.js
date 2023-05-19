const transActionValidator = (request, response, next) => {
    const requiredFields = ['id', 'itemName', 'amount', 'date', 'from', 'category'];
    const missingFields = [];
  
    for (const field of requiredFields) {
      if (!request.body.hasOwnProperty(field)) {
        missingFields.push(field);
      }
    }
  
    if (missingFields.length === 0) {
      next();
    } else if (missingFields.length === requiredFields.length) {
      return response.status(400).json({ error: 'Missing fields' });
    } else {
      return response.status(400).json({ error: 'Must fill in required fields' });
    }
  };
  
  module.exports = { transActionValidator };
  