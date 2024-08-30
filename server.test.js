const axios = require('axios');

test('GET /user returns user data', async () => {
  const response = await axios.get('http://localhost:3000/user');
  
  expect(response.status).toBe(200);
  expect(response.data).toEqual({ name: 'John Doe', age: 30 });
});
