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
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Recipe API</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      min-height: 100vh;
      color: #eee;
      padding: 40px 20px;
    }

    .wrapper { max-width: 900px; margin: 0 auto; }

    /* HEADER */
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .header h1 {
      font-size: 3rem;
      background: linear-gradient(90deg, #f7971e, #ffd200);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    .header p { color: #aaa; font-size: 1.1rem; }
    .badge {
      display: inline-block;
      margin-top: 12px;
      background: #27ae60;
      color: white;
      padding: 6px 18px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: bold;
    }

    /* CARDS */
    .card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 14px;
      padding: 28px;
      margin-bottom: 24px;
      backdrop-filter: blur(10px);
    }
    .card h2 {
      font-size: 1.3rem;
      margin-bottom: 18px;
      color: #ffd200;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 10px;
    }

    /* BASE URL BOX */
    .base-url {
      background: rgba(0,0,0,0.3);
      border: 1px solid #ffd200;
      border-radius: 8px;
      padding: 14px 18px;
      font-family: monospace;
      font-size: 1rem;
      color: #ffd200;
      word-break: break-all;
    }

    /* ENDPOINT ROWS */
    .endpoint {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(0,0,0,0.25);
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 10px;
      border-left: 4px solid transparent;
      transition: background 0.2s;
    }
    .endpoint:hover { background: rgba(255,255,255,0.07); }

    .method {
      font-weight: bold;
      font-size: 0.78rem;
      padding: 4px 10px;
      border-radius: 6px;
      min-width: 64px;
      text-align: center;
      letter-spacing: 1px;
    }
    .POST   { background: #27ae60; color: #fff; border-left-color: #27ae60; }
    .GET    { background: #2980b9; color: #fff; }
    .PUT    { background: #e67e22; color: #fff; }
    .DELETE { background: #e74c3c; color: #fff; }

    .endpoint.POST   { border-left-color: #27ae60; }
    .endpoint.GET    { border-left-color: #2980b9; }
    .endpoint.PUT    { border-left-color: #e67e22; }
    .endpoint.DELETE { border-left-color: #e74c3c; }

    .ep-path { font-family: monospace; font-size: 0.95rem; color: #fff; }
    .ep-desc { margin-left: auto; color: #aaa; font-size: 0.88rem; }

    /* HOW TO USE STEPS */
    .steps { counter-reset: step; }
    .step {
      display: flex;
      gap: 16px;
      margin-bottom: 18px;
      align-items: flex-start;
    }
    .step-num {
      background: linear-gradient(135deg, #f7971e, #ffd200);
      color: #1a1a2e;
      font-weight: bold;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 0.9rem;
    }
    .step-content h3 { font-size: 1rem; margin-bottom: 4px; color: #fff; }
    .step-content p  { color: #aaa; font-size: 0.9rem; line-height: 1.5; }
    .step-content code {
      background: rgba(0,0,0,0.4);
      color: #ffd200;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 0.85rem;
    }

    /* SAMPLE BODY */
    pre {
      background: rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 18px;
      overflow-x: auto;
      font-size: 0.85rem;
      color: #a8ff78;
      line-height: 1.6;
    }

    /* SCHEMA TABLE */
    table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    th {
      background: rgba(255,210,0,0.15);
      color: #ffd200;
      padding: 10px 14px;
      text-align: left;
      font-weight: 600;
    }
    td { padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #ccc; }
    tr:last-child td { border-bottom: none; }
    .req { color: #e74c3c; font-weight: bold; }

    /* FOOTER */
    .footer {
      text-align: center;
      margin-top: 40px;
      color: #555;
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
<div class="wrapper">

  <!-- HEADER -->
  <div class="header">
    <h1>🍳 Recipe API</h1>
    <p>A complete CRUD REST API for managing recipes</p>
    <span class="badge">✅ Server is Running</span>
  </div>

  <!-- BASE URL -->
  <div class="card">
    <h2>🔗 Base URL</h2>
    <div class="base-url">${baseUrl}/api</div>
  </div>

  <!-- ENDPOINTS -->
  <div class="card">
    <h2>📡 API Endpoints</h2>

    <div class="endpoint POST">
      <span class="method POST">POST</span>
      <span class="ep-path">/api/recipes</span>
      <span class="ep-desc">Create a new recipe</span>
    </div>
    <div class="endpoint GET">
      <span class="method GET">GET</span>
      <span class="ep-path">/api/recipes</span>
      <span class="ep-desc">Get all recipes</span>
    </div>
    <div class="endpoint GET">
      <span class="method GET">GET</span>
      <span class="ep-path">/api/recipes/:id</span>
      <span class="ep-desc">Get single recipe by ID</span>
    </div>
    <div class="endpoint PUT">
      <span class="method PUT">PUT</span>
      <span class="ep-path">/api/recipes/:id</span>
      <span class="ep-desc">Update recipe by ID</span>
    </div>
    <div class="endpoint DELETE">
      <span class="method DELETE">DELETE</span>
      <span class="ep-path">/api/recipes/:id</span>
      <span class="ep-desc">Delete recipe by ID</span>
    </div>
  </div>

  <!-- HOW TO USE -->
  <div class="card">
    <h2>🚀 How to Use This API</h2>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-content">
          <h3>Download & Open Postman</h3>
          <p>Go to <strong>postman.com</strong>, download and install Postman on your computer.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-content">
          <h3>Create a New Request</h3>
          <p>Click <strong>New → HTTP Request</strong>. Set method to <code>POST</code> and URL to <code>${baseUrl}/api/recipes</code></p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-content">
          <h3>Set Headers</h3>
          <p>Go to <strong>Headers</strong> tab and add: <code>Content-Type</code> = <code>application/json</code></p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-content">
          <h3>Add Request Body</h3>
          <p>Go to <strong>Body → raw → JSON</strong> and paste the sample JSON below, then click <strong>Send</strong>.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">5</div>
        <div class="step-content">
          <h3>Copy the _id</h3>
          <p>From the response, copy the <code>_id</code> value. Use it in GET / PUT / DELETE requests as <code>/api/recipes/_id</code></p>
        </div>
      </div>
    </div>
  </div>

  <!-- SAMPLE REQUEST BODY -->
  <div class="card">
    <h2>📋 Sample Request Body (Copy & Paste in Postman)</h2>
<pre>{
  "title": "Chocolate Chip Cookies",
  "ingredients": [
    "2 cups flour",
    "1 cup butter",
    "1 cup sugar",
    "2 eggs",
    "2 cups chocolate chips"
  ],
  "instructions": "Mix butter and sugar. Add eggs. Stir in flour. Fold in chocolate chips. Bake at 350F for 12 minutes.",
  "cookingTime": 25,
  "servings": 24,
  "category": "Dessert"
}</pre>
  </div>

  <!-- SCHEMA -->
  <div class="card">
    <h2>📝 Recipe Schema Rules</h2>
    <table>
      <tr>
        <th>Field</th><th>Type</th><th>Required</th><th>Rule</th>
      </tr>
      <tr><td>title</td><td>String</td><td class="req">Yes</td><td>Min 3 characters</td></tr>
      <tr><td>ingredients</td><td>Array</td><td class="req">Yes</td><td>Min 1 item</td></tr>
      <tr><td>instructions</td><td>String</td><td class="req">Yes</td><td>Min 10 characters</td></tr>
      <tr><td>cookingTime</td><td>Number</td><td class="req">Yes</td><td>Min 1 minute</td></tr>
      <tr><td>servings</td><td>Number</td><td class="req">Yes</td><td>Min 1 serving</td></tr>
      <tr><td>category</td><td>String</td><td class="req">Yes</td><td>Breakfast / Lunch / Dinner / Dessert / Snack / Beverage</td></tr>
    </table>
  </div>

  <div class="footer">Built with Node.js · Express.js · MongoDB · Mongoose</div>

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
