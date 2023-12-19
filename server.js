const express = require('express');
const app = express();
const port = 3000;

// Dummy data for demonstration
let posts = [
  { id: 1, title: 'Hello World', content: 'This is my first post!' }
  // ... more posts
];

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
