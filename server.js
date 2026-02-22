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
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Recipe API</title>
      <style>
        body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2c3e50; }
        .status { color: #27ae60; font-size: 20px; font-weight: bold; }
        .endpoint { background: #ecf0f1; padding: 10px; margin: 10px 0; border-radius: 5px; }
        .method { color: #e74c3c; font-weight: bold; }
        code { background: #34495e; color: white; padding: 2px 6px; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🍳 Recipe API</h1>
        <p class="status">✅ API is running successfully!</p>
        <h2>📡 Available Endpoints:</h2>
        <div class="endpoint"><span class="method">POST</span> <code>/api/recipes</code> - Create a new recipe</div>
        <div class="endpoint"><span class="method">GET</span> <code>/api/recipes</code> - Get all recipes</div>
        <div class="endpoint"><span class="method">GET</span> <code>/api/recipes/:id</code> - Get recipe by ID</div>
        <div class="endpoint"><span class="method">PUT</span> <code>/api/recipes/:id</code> - Update recipe by ID</div>
        <div class="endpoint"><span class="method">DELETE</span> <code>/api/recipes/:id</code> - Delete recipe by ID</div>
        <h2>🧪 Test API:</h2>
        <p>Use Postman or any API client to test the endpoints</p>
        <p><strong>Base URL:</strong> <code>${req.protocol}://${req.get('host')}/api</code></p>
      </div>
    </body>
    </html>
  `);
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
