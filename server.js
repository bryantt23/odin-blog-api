const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(
  cors({
    origin: '*'
  })
);

const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//user login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(
    '🚀 ~ file: server.js:41 ~ app.post ~  username, password:',
    username,
    password
  );

  // Find user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).send('Authentication failed');
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send('Authentication failed');
  }

  // Generate and return JWT
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
  res.json({ token });
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/posts', authenticateJWT, async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user.userId;

    // Create a new post
    const newPost = new Post({
      title,
      body,
      author: userId
    });
    await newPost.save();

    res.status(201).send('Post created');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
