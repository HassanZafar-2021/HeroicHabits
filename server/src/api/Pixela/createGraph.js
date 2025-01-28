const axios = require('axios');

// Define the URL and headers
const url = 'https://pixe.la/v1/users/buttandataylor/graphs';
const headers = {
  'X-USER-TOKEN': 'abc12345'  // Replace with your actual token
};

// Data for the new graph
const data = {
  "id": "test-graph",
  "name": "buttanda-taylor",
  "unit": "commit",
  "type": "int",
  "color": "shibafu"
};

// Send POST request using axios
axios.post(url, data, { headers })
  .then(response => {
    console.log("Graph created successfully:", response.data);
  })
  .catch(error => {
    console.error("Failed to create graph:", error.response.data);
  });
