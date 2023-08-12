import http from 'node:http';
import handlers from './handler.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(handlers).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { server };
