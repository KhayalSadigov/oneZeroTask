const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  createDate : String ,
  lastUpdateDate : String,
  isPublished : Boolean,
  isArchived : Boolean,
  placeInTheList : Number,
  schedule : Object,
  name : Array,
  menuItems : Array
});

module.exports = categorySchema;
    