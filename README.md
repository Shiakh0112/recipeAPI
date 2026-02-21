# Recipe API - Complete CRUD Application

A RESTful API for managing recipes built with Node.js, Express.js, and MongoDB.

## 🚀 Live Demo

- **GitHub Repository**: `https://github.com/Shiakh0112/recipeAPI`
- **Live API**: `https://recipeapi-517n.onrender.com/`

---

## 📦 Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/recipe-api.git
cd recipe-api

# 2. Install dependencies
npm install

# 3. Create .env file and add:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/recipeDB

# 4. Start server
npm start
```

---

## 📡 API Endpoints

**Base URL:** `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/recipes` | Create recipe |
| GET | `/recipes` | Get all recipes |
| GET | `/recipes/:id` | Get single recipe |
| PUT | `/recipes/:id` | Update recipe |
| DELETE | `/recipes/:id` | Delete recipe |

---

## 🧪 Postman Testing - Copy & Paste Ready

### Test 1: Create Recipe ✅

**Method:** `POST`  
**URL:** `http://localhost:3000/api/recipes`  
**Headers:** `Content-Type: application/json`

**Body (Copy & Paste):**
```json
{
  "title": "Chocolate Chip Cookies",
  "ingredients": [
    "2 cups flour",
    "1 cup butter",
    "1 cup sugar",
    "2 eggs",
    "2 cups chocolate chips"
  ],
  "instructions": "Mix butter and sugar until creamy. Add eggs and beat well. Gradually stir in flour. Fold in chocolate chips. Bake at 350°F for 12 minutes.",
  "cookingTime": 25,
  "servings": 24,
  "category": "Dessert"
}
```

**✅ Success Response:**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": {
    "_id": "65abc123def456789",
    "title": "Chocolate Chip Cookies",
    ...
  }
}
```

**📌 IMPORTANT: Copy the `_id` from response - you'll need it for next tests!**

---

### Test 2: Get All Recipes ✅

**Method:** `GET`  
**URL:** `http://localhost:3000/api/recipes`

**✅ Success Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [...]
}
```

---

### Test 3: Get Single Recipe ✅

**Method:** `GET`  
**URL:** `http://localhost:3000/api/recipes/YOUR_RECIPE_ID`

**Replace `YOUR_RECIPE_ID` with the `_id` you copied from Test 1**

**✅ Success Response:**
```json
{
  "success": true,
  "data": {...}
}
```

---

### Test 4: Update Recipe ✅

**Method:** `PUT`  
**URL:** `http://localhost:3000/api/recipes/YOUR_RECIPE_ID`  
**Headers:** `Content-Type: application/json`

**Body (Copy & Paste):**
```json
{
  "cookingTime": 30,
  "servings": 30
}
```

**✅ Success Response:**
```json
{
  "success": true,
  "message": "Recipe updated successfully",
  "data": {...}
}
```

---

### Test 5: Delete Recipe ✅

**Method:** `DELETE`  
**URL:** `http://localhost:3000/api/recipes/YOUR_RECIPE_ID`

**✅ Success Response:**
```json
{
  "success": true,
  "message": "Recipe deleted successfully",
  "data": {...}
}
```

---

## 🎯 More Test Recipes (Copy & Paste)

### Recipe 2: Pasta Carbonara
```json
{
  "title": "Pasta Carbonara",
  "ingredients": [
    "400g spaghetti",
    "200g pancetta",
    "4 eggs",
    "100g parmesan cheese",
    "Black pepper",
    "Salt"
  ],
  "instructions": "Cook spaghetti according to package directions. Fry pancetta until crispy. Beat eggs with parmesan. Drain pasta and mix with pancetta. Remove from heat and quickly stir in egg mixture. Season with pepper.",
  "cookingTime": 20,
  "servings": 4,
  "category": "Dinner"
}
```

### Recipe 3: Banana Smoothie
```json
{
  "title": "Banana Smoothie",
  "ingredients": [
    "2 ripe bananas",
    "1 cup milk",
    "1/2 cup yogurt",
    "1 tablespoon honey",
    "Ice cubes"
  ],
  "instructions": "Blend all ingredients until smooth. Add ice cubes and blend again. Serve immediately in a tall glass.",
  "cookingTime": 5,
  "servings": 2,
  "category": "Beverage"
}
```

### Recipe 4: Scrambled Eggs
```json
{
  "title": "Scrambled Eggs",
  "ingredients": [
    "4 eggs",
    "2 tablespoons milk",
    "1 tablespoon butter",
    "Salt to taste",
    "Black pepper to taste"
  ],
  "instructions": "Beat eggs with milk in a bowl. Melt butter in a non-stick pan over medium heat. Pour in egg mixture and gently stir until cooked to desired consistency. Season with salt and pepper.",
  "cookingTime": 10,
  "servings": 2,
  "category": "Breakfast"
}
```

### Recipe 5: Chicken Biryani
```json
{
  "title": "Chicken Biryani",
  "ingredients": [
    "500g chicken",
    "2 cups basmati rice",
    "3 onions sliced",
    "2 tomatoes",
    "1 cup yogurt",
    "Biryani masala",
    "Saffron",
    "Ghee"
  ],
  "instructions": "Marinate chicken with yogurt and spices. Cook rice separately. Fry onions until golden. Layer rice and chicken. Add saffron milk. Cook on low heat for 20 minutes.",
  "cookingTime": 60,
  "servings": 6,
  "category": "Lunch"
}
```

### Recipe 6: Chocolate Cake
```json
{
  "title": "Chocolate Cake",
  "ingredients": [
    "2 cups flour",
    "2 cups sugar",
    "3/4 cup cocoa powder",
    "2 eggs",
    "1 cup milk",
    "1/2 cup oil",
    "2 tsp vanilla extract"
  ],
  "instructions": "Mix all dry ingredients. Add eggs, milk, oil and vanilla. Beat well. Pour into greased pan. Bake at 350°F for 30-35 minutes. Cool before frosting.",
  "cookingTime": 45,
  "servings": 12,
  "category": "Dessert"
}
```

---

## ⚠️ Error Testing (Copy & Paste)

### Test: Missing Required Fields
```json
{
  "title": "Test"
}
```
**Expected:** 400 Error - Validation failed

### Test: Invalid Category
```json
{
  "title": "Test Recipe",
  "ingredients": ["ingredient 1"],
  "instructions": "Test instructions here",
  "cookingTime": 10,
  "servings": 2,
  "category": "InvalidCategory"
}
```
**Expected:** 400 Error - Invalid category

### Test: Short Title
```json
{
  "title": "AB",
  "ingredients": ["ingredient 1"],
  "instructions": "Test instructions here",
  "cookingTime": 10,
  "servings": 2,
  "category": "Dinner"
}
```
**Expected:** 400 Error - Title too short

---

## 📝 Recipe Schema Rules

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| title | String | Yes | Min 3 characters |
| ingredients | Array | Yes | Min 1 item |
| instructions | String | Yes | Min 10 characters |
| cookingTime | Number | Yes | Min 1 minute |
| servings | Number | Yes | Min 1 serving |
| category | String | Yes | Breakfast/Lunch/Dinner/Dessert/Snack/Beverage |

---

## 🚀 Deployment on Render

### Step 1: MongoDB Atlas Setup
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account → Create Cluster (M0 Free)
3. Database Access → Add User (username/password)
4. Network Access → Add IP: `0.0.0.0/0`
5. Connect → Get connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/recipeDB
```

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Recipe API"
git branch -M main
git remote add origin https://github.com/yourusername/recipe-api.git
git push -u origin main
```

### Step 3: Deploy on Render
1. Go to [render.com](https://render.com) → Sign up
2. New + → Web Service
3. Connect GitHub repository
4. Settings:
   - **Name:** recipe-api
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Environment Variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
6. Create Web Service → Wait 5-10 minutes

### Step 4: Test Live API
Your API: `https://recipe-api-xxxx.onrender.com`

**Update Postman URLs to:**
```
https://recipe-api-xxxx.onrender.com/api/recipes
```

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MongoDB Not Connected
- Check if MongoDB is running: `mongod`
- Verify `.env` file exists
- Check connection string format

### Module Not Found
```bash
npm install
```

---

## 📋 Project Structure

```
recipe-api/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   └── recipeController.js  # CRUD operations
├── models/
│   └── Recipe.js            # Mongoose schema
├── routes/
│   └── recipeRoutes.js      # API routes
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── server.js                # Entry point
└── README.md
```

---

## 🎯 Submission Checklist

- [ ] Code pushed to GitHub
- [ ] API deployed on Render
- [ ] MongoDB Atlas configured
- [ ] All 5 endpoints tested
- [ ] README.md complete

**Submit:**
- GitHub URL: `https://github.com/yourusername/recipe-api`
- Live API URL: `https://recipe-api-xxxx.onrender.com`

---

## 📞 Quick Commands

```bash
npm install          # Install dependencies
npm start            # Start server
npm run dev          # Development mode
git add .            # Stage changes
git commit -m "msg"  # Commit
git push origin main # Push to GitHub
```

---

**🎉 Happy Coding!**
