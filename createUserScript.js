const mongoose = require('mongoose');

// Replace with your connection string, username, and password
const connectionString = 'your_mongodb_connection_string';

// Define the user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
  // Add other fields as necessary
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connection error handling
mongoose.connection.on('error', error => {
  console.error('Database connection error:', error);
  process.exit(1);
});

// Function to create a user
const createUser = async (username, password) => {
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Replace with the username and password you want to create
const username = 'your_username';
const password = 'your_password';

createUser(username, password);
