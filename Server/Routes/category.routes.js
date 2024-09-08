const express = require("express");
const endpoints = require("../Constants/endpoints");
const categoryController = require("../Controllers/category.controller");
const categoryMiddleware = require("../Middlewares/category.middlewares");

const categoryRouter = express.Router();
0
categoryRouter.get(endpoints.menu.getAll, categoryController.getAll);
categoryRouter.get(endpoints.menu.getOne, categoryController.getOne);
categoryRouter.post(endpoints.menu.post,categoryMiddleware, categoryController.post);
categoryRouter.delete(endpoints.menu.delete, categoryController.delete);

module.exports = categoryRouter;
