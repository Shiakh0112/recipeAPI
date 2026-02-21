require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', recipeRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Recipe API is running',
    endpoints: {
      'POST /api/recipes': 'Create a new recipe',
      'GET /api/recipes': 'Get all recipes',
      'GET /api/recipes/:id': 'Get recipe by ID',
      'PUT /api/recipes/:id': 'Update recipe by ID',
      'DELETE /api/recipes/:id': 'Delete recipe by ID'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
