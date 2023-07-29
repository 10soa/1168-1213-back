require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//Connection base Mongo
require("./config/database");

const test = require("./routes/Test");
const utilisateur = require("./routes/Utilisateur");
const notification = require("./routes/Notification");
const categorie = require("./routes/Categorie");

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* routes */
app.use("/", test);
app.use("/APK_projet/Utilisateur", utilisateur);
app.use("/APK_projet/Notification", notification);
app.use("/APK_projet/Categorie", categorie);


module.exports = app;
