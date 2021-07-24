const { SERVER_PORT } = require('../config/config');
const app = require('../app');
const http = require('http');
const server = http.createServer(app);

const port = SERVER_PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})