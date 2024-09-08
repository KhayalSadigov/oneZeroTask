const mongoose = require('mongoose');
const categorySchema = require('../Schemas/category.schema');

const Categories = mongoose.model("Categories" , categorySchema)

module.exports = Categories