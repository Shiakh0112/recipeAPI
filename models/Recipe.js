const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long']
  },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one ingredient is required'
    }
  },
  instructions: {
    type: String,
    required: [true, 'Instructions are required'],
    minlength: [10, 'Instructions must be at least 10 characters long']
  },
  cookingTime: {
    type: Number,
    required: [true, 'Cooking time is required'],
    min: [1, 'Cooking time must be at least 1 minute']
  },
  servings: {
    type: Number,
    required: [true, 'Number of servings is required'],
    min: [1, 'Servings must be at least 1']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);
