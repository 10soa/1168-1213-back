require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// const PORT = process.env.PORT || 2002 ;
const test = require("./routes/Test");

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* routes */
app.use("/", test);


module.exports = app;
