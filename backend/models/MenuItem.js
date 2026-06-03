import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a dish name'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Antipasti', 'Pasta', 'Mains', 'Desserts', 'Drinks'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
    },
    emoji: {
      type: String,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    ingredients: [String],
    allergens: [String],
    calories: Number,
    dietaryInfo: {
      vegan: Boolean,
      vegetarian: Boolean,
      glutenFree: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('MenuItem', menuItemSchema);
