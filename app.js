const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const errorController = require('./controllers/error');

const imageFile = require('./utils/file');
const { MONGODB_URI, PORT } = require('./config');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  multer({
    storage: imageFile.imageFileStorage,
    fileFilter: imageFile.imageFileFilter,
  }).fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'file', maxCount: 8 },
  ])
);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Error handling middleware
app.use(errorController.error500);

// Database connection and server start
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log('Server is running on port: ' + PORT);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
