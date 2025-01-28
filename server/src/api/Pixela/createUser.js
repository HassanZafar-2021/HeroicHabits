// Import axios
const axios = require('axios');

// Create user function
const createUser = async () => {
  try {
    // Send POST request to Pixela API
    const response = await axios.post('https://pixe.la/v1/users', {
      token: 'abc12345',            // Replace with your actual secure token
      username: 'buttandataylor',   // Replace with your desired username
      agreeTermsOfService: 'yes',
      notMinor: 'yes'
    });

    // Log successful response
    console.log('User created:', response.data);
  } catch (error) {
    // Log any error that occurs
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};

// Call createUser to execute the function
createUser();
