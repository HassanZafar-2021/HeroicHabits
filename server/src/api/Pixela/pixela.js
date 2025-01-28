// src/api/pixela.js
const axios = require('axios');
const config = require('../config/config');

// Create Graph function
const createGraph = async () => {
  try {
    const response = await axios.post(`https://pixe.la/v1/users/${config.buttandataylor}/graphs`, {
      id: 'myGraph',              // Choose a unique ID for the graph
      name: 'My Weekly Graph',           // Graph name
      unit: 'steps',              // Example unit: steps
      type: 'int',                // Data type (int or float)
      color: 'shibafu'            // Graph color
    }, {
      headers: {
        'abc12345': config.token  // Use the token from the config file
      }
    });

    console.log('Graph created:', response.data);
  } catch (error) {
    console.error('Error creating graph:', error.response ? error.response.data : error.message);
  }
};

// Export function for use in other files
module.exports = {
  createGraph
};
