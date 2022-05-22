//Database Model for Inventory System
const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema({
  productPrice: {
    type: String,
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },

  productQuantity: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  deleteComment: {
    type: String,
   
  },
});

mongoose.model("Inventory", inventorySchema);
