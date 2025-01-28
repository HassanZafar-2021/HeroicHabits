require('dotenv').config(); // Load environment variables

const axios = require('axios');

const addDataToGraph = async () => {
  const username = process.env.PIXELA_USERNAME; // Correct environment variable keys
  const token = process.env.PIXELA_TOKEN;
  const graphId = process.env.PIXELA_GRAPH_ID;

  try {
    const response = await axios.post(
      `https://pixe.la/v1/users/buttandataylor/graphs/test-graph`,
      {
        date: '20250127', // Replace with the date you want to add data for
        quantity: '5',    // Replace with the quantity of the graph data
      },
      {
        headers: {
          'X-USER-TOKEN': token, // Correct header key for Pixela API
        },
      }
    );

    console.log('Data added successfully:', response.data);
  } catch (error) {
    console.error('Error adding data:', error.response?.data || error.message);
  }
};

addDataToGraph();


