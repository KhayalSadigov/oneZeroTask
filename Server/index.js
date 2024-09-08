// Import Package
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const port = 2121;
const URL =
"mongodb+srv://khayalsadigov:x101010s@cluster0.kp995.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const categoryRouter = require("./Routes/category.routes");


app.use(categoryRouter)




// Config
mongoose.connect(URL).then(() => {
  console.log("Connected!");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
